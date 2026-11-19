import { useId, type ReactNode } from 'react'
import { letterStats } from '../lib/ciphers'

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

export function Wheel({ source, mapped }: { source: string; mapped: string }) {
  const id = useId()
  return <div className="wheel-card" role="img" aria-label={'Alphabet wheel, ' + source + ' maps to ' + mapped}>
    <div className="wheel"><svg viewBox="0 0 200 200" aria-hidden="true">
      <defs><path id={id} d="M 100 100 m -79 0 a 79 79 0 1 1 158 0 a 79 79 0 1 1 -158 0" /></defs>
      <circle cx="100" cy="100" r="94" /><circle cx="100" cy="100" r="67" /><circle cx="100" cy="100" r="61" strokeDasharray="2 6" />
      <text><textPath href={'#' + id} textLength="488">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z </textPath></text>
    </svg><div><strong>{source}</strong><span>→</span><strong>{mapped}</strong></div></div>
  </div>
}
