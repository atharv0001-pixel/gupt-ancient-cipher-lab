import { useState } from 'react'
import { PageHeading, Panel } from '../components/Lab'
import { digits, readWord, rows, spellNumber } from '../lib/katapayadi'

const examples = [{ word: 'कवि', name: 'Poet' }, { word: 'राम', name: 'Rāma' }, { word: 'कर्म', name: 'Action' }, { word: 'अग्नि', name: 'Fire' }]

export default function KatapayadiLabPage() {
  const [mode, setMode] = useState<'word' | 'number'>('word')
  const [word, setWord] = useState('कवि')
  const [number, setNumber] = useState('41')
  const [choices, setChoices] = useState<Record<number,string>>({})
  const result = readWord(word)
  const options = spellNumber(number)
  const reading = options.map((unit, i) => choices[i] ?? unit.letters[0]).join('')
  function updateNumber(value: string) { setNumber(value); setChoices({}) }
  return <div className="content-width">
    <PageHeading title="Kaṭapayādi Numerical Laboratory">Explore how Sanskrit syllables can carry decimal digits in a word or verse.</PageHeading>
    <div className="toolbar"><div className="segmented" aria-label="Conversion direction"><button aria-pressed={mode === 'word'} onClick={() => setMode('word')}>Word to number</button><button aria-pressed={mode === 'number'} onClick={() => setMode('number')}>Number to syllables</button></div></div>
    <div className="work-grid kata-grid">
      <Panel title="Varṇa–saṅkhyā matrix"><p>Each column gives a digit. Several consonants share each value.</p>
        <div className="matrix-wrap"><table className="glyph-table"><caption>Consonant-to-digit table</caption><thead><tr>{[1,2,3,4,5,6,7,8,9,0].map(n => <th key={n} scope="col">{n}</th>)}</tr></thead>
        <tbody>{rows.map(row => <tr key={row}>{Array.from({length:10},(_,i) => <td lang="sa" key={i} className={row[i] && mode === 'word' && result.syllables.some(s => s.digit === digits.get(row[i])) ? 'digit-active' : ''}>{row[i] || '·'}</td>)}</tr>)}</tbody></table></div>
        <h3>Reading convention</h3><ol className="steps"><li>Use the last vowel-bearing consonant in each cluster.</li><li>An independent vowel contributes zero. A consonant ending in a virāma contributes no digit.</li><li>Read the digits from right to left to recover the number.</li></ol>
      </Panel>
      <div className="stack">{mode === 'word' ? <Panel title="Syllable workbench" accent>
        <label className="field">Devanagari word or phrase<textarea lang="sa" value={word} maxLength={300} onChange={e => setWord(e.target.value)} /></label>
        <div className="example-list">{examples.map(item => <button key={item.word} onClick={() => setWord(item.word)}><b lang="sa">{item.word}</b> · {item.name}</button>)}</div>
        {result.unsupported.length > 0 ? <p role="alert">Use Sanskrit in Devanagari. Unsupported characters: {result.unsupported.join(' ')}</p> : <>
          <h3>Syllable breakdown</h3><div className="glyphs">{result.syllables.map((s,i) => <div key={i}><strong lang="sa">{s.glyph}</strong><small>{s.digit ?? 'silent'}</small></div>)}</div>
          <div className="result-line"><span>Written order</span><b>{result.written.join(', ') || '—'}</b></div><div className="result-line"><span>Number</span><output>{result.value || '—'}</output></div>
          {!result.value && <p>Enter a vowel-bearing syllable to produce a digit.</p>}</>}
      </Panel> : <Panel title="Number to syllables" accent><label className="field">Decimal digits<input value={number} inputMode="numeric" maxLength={24} onChange={e => updateNumber(e.target.value)} /></label>
        <p>Choose a consonant for each digit in writing order. The result is a possible sound sequence and may have no dictionary meaning.</p>
        {options.length ? <><div className="number-controls">{options.map((unit,i) => <label className="field" key={i}>Digit {unit.digit}<select lang="sa" value={choices[i] ?? unit.letters[0]} onChange={e => setChoices(prev => ({...prev,[i]:e.target.value}))}>{unit.letters.map(l => <option key={l}>{l}</option>)}</select></label>)}</div>
          <output className="readout" lang="sa">{reading}</output><button className="line-button" onClick={() => {setWord(reading);setMode('word')}}>Check this sequence →</button></> : <p role="status">Enter digits from 0 to 9.</p>}
      </Panel>}
      <Panel title="A mathematical memory aid"><p>Kaṭapayādi lets an author express numbers in syllables that can be woven into memorable phrases. This lab uses the Kerala convention described by S. R. Sarma. Other regional conventions exist.</p>
        <a className="source-link" href="https://www.numdam.org/item/RHM_2012__18_1_37_0/" target="_blank" rel="noreferrer">Read Sarma’s study (2012) ↗</a></Panel></div>
    </div></div>
}
