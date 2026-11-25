import { useId, useRef, type PointerEvent, type ReactNode } from 'react'
import { alphabet, letterStats } from '../lib/ciphers'

export function PageHeading({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return <header className="work-heading"><div><h1>{title}</h1><p>{children}</p></div>{action}</header>
}

export function Panel({ title, children, accent, className = '' }: { title: string; children: ReactNode; accent?: boolean; className?: string }) {
  return <section className={'lab-panel ' + (accent ? 'accent-panel ' : '') + className}><h2>{title}</h2>{children}</section>
}

export function Frequency({ text }: { text: string }) {
  const { frequencies, total } = letterStats(text)
  const max = Math.max(1, ...frequencies.map(item => item.count))
  return <Panel title="Letter frequency" accent>
    <figure><figcaption>{total} Latin letters in the current text</figcaption>
      <div className="frequency" aria-hidden="true">{frequencies.map(item => <div key={item.letter} title={item.letter + ' · ' + item.count}>
        <div className="bar-track"><i style={{ height: (100 * item.count / max) + '%' }} /></div><small>{item.letter}</small>
      </div>)}</div>
    </figure>
    <details><summary>View counts</summary><div className="count-list">{frequencies.map(item => <span key={item.letter}>{item.letter} <b>{item.count}</b></span>)}</div></details>
  </Panel>
}

export function Wheel({ source, mapped, onSelect }: { source: string; mapped: string; onSelect: (letter: string) => void }) {
  const id = useId()
  const drag = useRef<{ angle: number; position: number } | null>(null)
  const position = alphabet.indexOf(source)
  function select(value: number) {
    onSelect(alphabet[((Math.round(value) % 26) + 26) % 26])
  }
  function angle(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect()
    return Math.atan2(event.clientY - bounds.top - bounds.height / 2, event.clientX - bounds.left - bounds.width / 2)
  }
  return <div className="wheel-card">
    <p id={id}>Drag the wheel or use the controls to explore a letter.</p>
    <div className="wheel" onPointerDown={event => {
      if (event.button !== 0) return
      event.currentTarget.setPointerCapture(event.pointerId)
      drag.current = { angle: angle(event), position }
    }} onPointerMove={event => {
      if (!drag.current) return
      const currentAngle = angle(event)
      const delta = Math.atan2(Math.sin(currentAngle - drag.current.angle), Math.cos(currentAngle - drag.current.angle))
      drag.current.position -= delta * 26 / (2 * Math.PI)
      drag.current.angle = currentAngle
      select(drag.current.position)
    }} onPointerUp={() => { drag.current = null }} onPointerCancel={() => { drag.current = null }} onLostPointerCapture={() => { drag.current = null }}>
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="100" r="94" /><circle cx="100" cy="100" r="67" />
        <g transform={'rotate(' + (-position * 360 / 26) + ' 100 100)'}>
          {[...alphabet].map((letter, index) => <text key={letter} x="100" y="22" textAnchor="middle" transform={'rotate(' + (index * 360 / 26) + ' 100 100)'}>{letter}</text>)}
        </g>
        <path className="wheel-pointer" d="M 96 2 L 104 2 L 100 9 Z" />
      </svg>
      <div><strong>{source}</strong><span>→</span><strong>{mapped}</strong></div>
    </div>
    <div className="actions wheel-controls">
      <button className="line-button" aria-label="Previous letter" onClick={() => select(position - 1)}>←</button>
      <output aria-live="polite">{source} → {mapped}</output>
      <button className="line-button" aria-label="Next letter" onClick={() => select(position + 1)}>→</button>
    </div>
    <label className="field wheel-slider">Explore letter
      <input type="range" min="0" max="25" value={position} aria-valuetext={source + ' maps to ' + mapped} aria-describedby={id} onChange={event => select(Number(event.target.value))} />
    </label>
  </div>
}
