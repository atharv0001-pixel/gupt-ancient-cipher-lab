import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Frequency, PageHeading, Panel } from '../components/Lab'
import { alphabet, letterStats, repeatedGroups, transform } from '../lib/ciphers'

const samples = [
  { title: 'Courier note', text: 'WKH OHWWHU LV LQ WKH DUFKLYH' },
  { title: 'River crossing', text: 'RJJY GD YMJ WNAJW' },
  { title: 'Mirror alphabet', text: 'GSV NZK RH RM GSV ZIXSREV' },
]
type Guesses = Record<string, string>

export default function CipherBreakingPage() {
  const incoming = useLocation().state?.text
  const [text, setText] = useState(typeof incoming === 'string' ? incoming.slice(0, 4000) : samples[0].text)
  const [selected, setSelected] = useState(3)
  const [tab, setTab] = useState<'shift'|'map'>('shift')
  const [guesses, setGuesses] = useState<Guesses>({})
  const [hint, setHint] = useState(false)
  const { total, frequencies, coincidence } = letterStats(text)
  const frequent = [...frequencies].sort((a,b) => b.count - a.count)[0]
  const reconstruction = text.replace(/[A-Za-z]/g, c => guesses[c.toUpperCase()] ?? '·')
  const reading = tab === 'shift' ? transform(text, 'caesar', 'decode', selected) : reconstruction
  const codedWords = text.match(/\S+/g) ?? []
  const decodedWords = reading.match(/\S+/g) ?? []
  function update(value: string) { setText(value); setGuesses({}); setHint(false) }
  return <div className="content-width">
    <PageHeading title="Cipher Breaking Studio">Use counts, repeated groups and competing readings to examine a classroom ciphertext.</PageHeading>
    <div className="work-grid studio-grid">
      <div className="stack"><Panel title="Intercept stream"><label className="field">Practice sample<select value={samples.find(s => s.text === text)?.title ?? ''} onChange={e => {const match=samples.find(s => s.title === e.target.value); if(match) update(match.text)}}><option value="" disabled>Custom ciphertext</option>{samples.map(s => <option key={s.title}>{s.title}</option>)}</select></label>
        <label className="field">Ciphertext<textarea value={text} maxLength={4000} onChange={e => update(e.target.value)} /></label><p>{total} Latin letters available for analysis.</p></Panel>
        <Panel title="Pattern evidence"><div className="result-line"><span>Coincidence index</span><b>{coincidence?.toFixed(3) ?? '—'}</b></div><p>The chance that two letters drawn without replacement match. Small samples can swing widely.</p>
        {[2,3].map(size => <div key={size}><h3>{size === 2 ? 'Repeated pairs' : 'Repeated triples'}</h3><div className="example-list">{repeatedGroups(text,size).length ? repeatedGroups(text,size).map(([s,n]) => <span key={s}>{s} × {n}</span>) : <small>None found.</small>}</div></div>)}</Panel></div>
      <div className="stack"><Frequency text={text} /><Panel title="Reading workbench" accent>
        <div className="segmented"><button aria-pressed={tab === 'shift'} onClick={() => setTab('shift')}>Caesar shifts</button><button aria-pressed={tab === 'map'} onClick={() => setTab('map')}>Substitution guesses</button></div>
        {tab === 'shift' ? <><label className="field">Decoding shift · {selected}<input type="range" min="0" max="25" value={selected} onChange={e => setSelected(Number(e.target.value))} /></label>
          <output className="readout">{reading || '—'}</output>
          <details><summary>Compare all 26 shifts</summary><ol className="candidates" start={0}>{[...alphabet].map((_,i) => <li key={i}><button aria-pressed={i === selected} onClick={() => setSelected(i)}><b>{String(i).padStart(2,'0')}</b> {transform(text,'caesar','decode',i) || '—'}</button></li>)}</ol></details></> :
          <><p>Assign a plaintext letter to each ciphertext letter. Dots mark unsolved letters.</p>
          <div className="guess-board">{frequencies.filter(f => f.count).map(f => <label key={f.letter}>{f.letter}<select aria-label={'Guess for '+f.letter} value={guesses[f.letter] ?? ''} onChange={e => setGuesses(previous => ({...previous,[f.letter]:e.target.value}))}><option value="">·</option>{[...alphabet].map(l => <option key={l} disabled={Object.entries(guesses).some(([from,to]) => from !== f.letter && to === l)}>{l}</option>)}</select></label>)}</div>
          <output className="readout">{reading || '—'}</output><button className="line-button" onClick={() => setGuesses({})}>Clear guesses</button></>}
      </Panel>
      <Panel title="Word-by-word decoding" accent>
        {codedWords.length ? <div className="word-decoding-scroll" role="region" aria-label="Word-by-word decoding table" tabIndex={0}>
          <table className="word-decoding-table">
            <caption>{tab === 'shift' ? `Reading with Caesar shift ${selected}` : 'Reading with your substitution guesses. Dots mark unsolved letters.'}</caption>
            <thead><tr><th scope="col">Coded word</th><th scope="col">{tab === 'shift' ? 'Decoded word' : 'Current guess'}</th></tr></thead>
            <tbody>{codedWords.map((word, index) => <tr key={index}><td>{word}</td><td>{decodedWords[index]}</td></tr>)}</tbody>
          </table>
        </div> : <p>Enter a coded message above to see each word and its reading.</p>}
      </Panel></div>
      <div className="stack"><Panel title="Analyst’s notebook"><h3>Where to start</h3><ol className="steps"><li>Find a letter or group that repeats.</li><li>Try a shift or assign one letter at a time.</li><li>Check whether the reading makes sense across the whole message.</li></ol>
        <button className="line-button" disabled={!total} onClick={() => setHint(!hint)}>{hint ? 'Hide hint' : 'Reveal a hint'}</button>{hint && <p className="hint" role="status">{frequent.letter} appears {frequent.count} time(s). Try a common plaintext letter such as E or T, then check the resulting words.</p>}</Panel>
        <Panel title="What survives substitution?"><p>A fixed letter substitution carries repeated patterns into the ciphertext. Two identical plaintext letters always produce the same ciphertext letter under that key.</p></Panel>
      </div>
    </div></div>
}
