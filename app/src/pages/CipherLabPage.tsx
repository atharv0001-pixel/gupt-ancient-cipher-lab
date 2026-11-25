import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Frequency, PageHeading, Panel, Wheel } from '../components/Lab'
import { alphabet, methods, substitutionAlphabet, transform, type Direction, type Method } from '../lib/ciphers'

const samples = ['HELLO', 'KNOWLEDGE TRAVELS WITH THE MESSENGER', 'MEET BY THE RIVER']
type Experiment = { method: Method; direction: Direction; shift: number; keyword: string; columns: number; input: string }
const empty: Experiment = { method: 'caesar', direction: 'encode', shift: 3, keyword: 'LOTUS', columns: 4, input: samples[0] }
const storageKey = 'gupt.cipher.notebook.v1'

function loadNotebook(): Experiment[] {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]')
    if (!Array.isArray(data)) return []
    return data.filter((e): e is Experiment => e && methods.some(m => m.id === e.method) &&
      ['encode', 'decode'].includes(e.direction) && typeof e.input === 'string' && typeof e.keyword === 'string' &&
      Number.isInteger(e.shift) && e.shift >= 0 && e.shift < 26 && Number.isInteger(e.columns) && e.columns >= 2 && e.columns <= 10).slice(0, 12)
  } catch { return [] }
}

export default function CipherLabPage() {
  const messageInput = useRef<HTMLTextAreaElement>(null)
  const [experiment, setExperiment] = useState(empty)
  const [notebook, setNotebook] = useState(loadNotebook)
  const [notice, setNotice] = useState('')
  const [exploredLetter, setExploredLetter] = useState<string | null>(null)
  const { method, direction, shift, keyword, columns, input } = experiment
  const patch = (value: Partial<Experiment>) => { setExperiment(e => ({ ...e, ...value })); setNotice('') }
  const valid = method !== 'keyword' || /[a-z]/i.test(keyword)
  const output = valid ? transform(input, method, direction, shift, keyword, columns) : ''
  const key = substitutionAlphabet(method, shift, keyword)
  const inputLetter = exploredLetter ?? input.match(/[a-z]/i)?.[0].toUpperCase() ?? 'A'
  const mapped = transform(inputLetter, method, direction, shift, keyword, columns)
  function save() {
    const existing = loadNotebook().filter(e => JSON.stringify(e) !== JSON.stringify(experiment))
    const next = [experiment, ...existing].slice(0, 12)
    try { localStorage.setItem(storageKey, JSON.stringify(next)); setNotebook(next); setNotice('Saved in this browser.') }
    catch { setNotice('Your browser could not save this experiment.') }
  }
  return <div className="content-width">
    <PageHeading title="Ancient Cipher Laboratory">Compare five classroom ciphers and trace a transformation from message to result.</PageHeading>
    <div className="work-grid cipher-grid">
      <div className="stack"><Panel title="Transformation engine"><div className="method-list">{methods.map(m => <button key={m.id} aria-pressed={method === m.id} onClick={() => patch({ method: m.id })}>
        <strong>{m.name}</strong><small>{m.summary}</small></button>)}</div></Panel>
        <Panel title="Parameters"><label className="field">Operation<select value={direction} onChange={e => patch({ direction: e.target.value as Direction })}><option value="encode">Encode</option><option value="decode">Decode</option></select></label>
          {method === 'caesar' && <label className="field">Shift · {shift}<input type="range" min="0" max="25" value={shift} onChange={e => patch({ shift: Number(e.target.value) })} /></label>}
          {method === 'columns' && <label className="field">Columns · {columns}<input type="range" min="2" max="10" value={columns} onChange={e => patch({ columns: Number(e.target.value) })} /></label>}
          {method === 'keyword' && <label className="field">Keyword<input value={keyword} maxLength={60} onChange={e => patch({ keyword: e.target.value })} /></label>}
          {!valid && <p role="alert">Use at least one Latin letter in the keyword.</p>}
        </Panel></div>
      <div className="stack"><Panel title="Message workbench"><label className="field">Sample<select value={samples.includes(input) ? input : ''} onChange={e => {
          const sample = e.target.value
          patch({ input: sample, direction: sample ? 'encode' : direction })
          if (!sample) messageInput.current?.focus()
        }}><option value="">Custom message</option>{samples.map(s => <option key={s}>{s}</option>)}</select></label>
        <label className="field">{direction === 'encode' ? 'Plaintext' : 'Ciphertext'}<textarea ref={messageInput} value={input} placeholder="Type your message here" maxLength={4000} onChange={e => patch({ input: e.target.value })} /></label>
        <label className="field">Result<output className="readout">{output || '—'}</output></label>
        <div className="actions"><button className="gold-button" disabled={!output} onClick={() => patch({ input: output, direction: direction === 'encode' ? 'decode' : 'encode' })}>Reverse operation ⇄</button>
        <button className="line-button" disabled={!output} onClick={save}>Save experiment</button></div><p className="feedback" role="status">{notice}</p>
      </Panel><Panel title={method === 'columns' ? 'Column readout' : 'Letter mapping'} accent>
        {method === 'columns' ? <p>The message fills {columns} columns across. Encoding reads the columns from top to bottom, including spaces and punctuation.</p> : <>
          <Wheel source={inputLetter} mapped={mapped} onSelect={setExploredLetter}/>
          {method === 'keyword' ? <>
            {valid ? <>
              <div className="keyword-table-scroll" tabIndex={0} role="region" aria-label="Keyword alphabet mapping">
                <table className="keyword-alphabet"><tbody>
                  <tr><th scope="row">Normal</th>{[...alphabet].map(letter => <td key={letter}>{letter}</td>)}</tr>
                  <tr><th scope="row">New</th>{[...key].map(letter => <td key={letter}>{letter}</td>)}</tr>
                </tbody></table>
              </div>
              <p>{direction === 'encode' ? 'Replace each letter in the Normal row with the letter directly below it.' : 'Find each letter in the New row and use the letter directly above it.'}</p>
              <div className="keyword-breakdown">
                <table className="atbash-pairs">
                  <caption>Your message, letter by letter</caption>
                  <thead><tr><th scope="col">Original letter</th><th scope="col">{direction === 'encode' ? 'Letter below it' : 'Letter above it'}</th></tr></thead>
                  <tbody>{(input.match(/[a-z]/gi) ?? []).map((letter, index) => <tr key={index}><td>{letter}</td><td>{transform(letter, method, direction, shift, keyword)}</td></tr>)}</tbody>
                </table>
              </div>
            </> : <p>Enter a keyword containing at least one English letter to see its alphabet.</p>}
          </> : method === 'paired' ? <>
            <div className="reciprocal-pairs" aria-label="Reciprocal alphabet partners">
              {[alphabet.slice(0, 13), alphabet.slice(13)].map((row, rowIndex) => <div className="pair-row" key={rowIndex}>
                {[...row].map(letter => <button key={letter} aria-label={letter + ' pairs with ' + transform(letter, 'paired', 'encode')} aria-pressed={inputLetter === letter} className={inputLetter === letter || mapped === letter ? 'pair-active' : ''} onClick={() => setExploredLetter(letter)}>{letter}</button>)}
              </div>)}
            </div>
            <p className="pair-help">Letters above and below each other are partners. Select either letter to explore the pair.</p>
          </> : method === 'atbash' ? <>
            <p>A and Z are partners because they are at opposite ends of the alphabet. Move inward from both ends to find each pair.</p>
            <table className="atbash-pairs">
              <caption>Atbash mirror partners</caption>
              <thead><tr><th scope="col">Letter</th><th scope="col">Swap</th><th scope="col">Partner</th></tr></thead>
              <tbody>{[...alphabet.slice(0, 13)].map((letter, index) => {
                const partner = alphabet[25 - index]
                return <tr key={letter} className={inputLetter === letter || inputLetter === partner ? 'pair-active' : ''}>
                  <td><button aria-label={'Explore ' + letter} onClick={() => setExploredLetter(letter)}>{letter}</button></td>
                  <td>↔</td>
                  <td><button aria-label={'Explore ' + partner} onClick={() => setExploredLetter(partner)}>{partner}</button></td>
                </tr>
              })}</tbody>
            </table>
          </> : <div className="mapping-strip">{[...alphabet].map((letter, i) => <span key={letter}><b>{direction === 'encode' ? letter : key[i]}</b>{direction === 'encode' ? key[i] : letter}</span>)}</div>}</>}
      </Panel></div>
      <div className="stack"><Frequency text={output} /><Panel title="Historical context"><p>Book I of the Arthaśāstra mentions <em>gūḍhalekhya</em>, or cipher-writing, as a way of relaying information. The alphabet operations here are classroom models for exploring how such secrecy works.</p><a className="source-link" href="https://en.wikisource.org/wiki/Arthashastra/Book_I#CHAPTER_XII." target="_blank" rel="noreferrer">Read Book I, chapter XII ↗</a></Panel>
      <Panel title="Experiment notebook"><p>{notebook.length ? 'Select a saved experiment to restore it.' : 'Save an experiment to revisit its message and key on this device.'}</p>
      <ul className="notebook">{notebook.map((e,i) => <li key={i}><button onClick={() => { setExperiment(e); setNotice('Restored from your notebook.') }}><strong>{methods.find(m => m.id === e.method)?.name}</strong><small>{e.input}</small></button></li>)}</ul>
      </Panel>{output && <Link className="line-button" to="/cipher-breaking" state={{ text: direction === 'encode' ? output : input }}>Inspect in Breaking Studio →</Link>}</div>
    </div>
  </div>
}
