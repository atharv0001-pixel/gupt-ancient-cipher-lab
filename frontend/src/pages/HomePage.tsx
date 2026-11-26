import { Link } from 'react-router-dom'

const labs = [
  { to: '/cipher-lab', title: 'Cipher Laboratory', description: 'Write a message, choose a key and follow each letter as it changes.', preview: 'ABC → DEF', link: 'Open the workbench' },
  { to: '/katapayadi-lab', title: 'Kaṭapayādi Laboratory', description: 'Read the digits inside a Sanskrit word and build a syllable sequence for a number.', preview: 'कवि → 41', link: 'Explore the notation' },
  { to: '/cipher-breaking', title: 'Cipher Breaking Studio', description: 'Inspect letter frequencies, try a substitution and compare possible readings.', preview: 'KHOOR → HELLO', link: 'Analyse a sample' },
]

export default function HomePage() {
  return <div className="content-width home">
    <section className="home-hero"><div className="hero-copy">
      <p className="eyebrow">Indian Knowledge Systems</p>
      <h1>The Ancient Indian <br /><em>Cipher Lab</em></h1>
      <p>How can a word hold a number? What does a coded message give away? Explore secrecy and numerical notation through three hands-on experiments.</p>
      <Link className="gold-button" to="/cipher-lab">Enter the Cipher Lab <span aria-hidden="true">→</span></Link>
    </div><figure className="hero-image"><img src="/manuscript-study.jpg" alt="Illustration of a manuscript with lines of script and a geometric drawing" /><figcaption>Manuscript study · Design illustration</figcaption></figure></section>
    <section className="lab-directory"><h2>The laboratories</h2><div className="directory-grid">{labs.map(lab => <Link key={lab.to} className="directory-card" to={lab.to}>
      <div className="sample-preview">{lab.preview}</div><h3>{lab.title}</h3><p>{lab.description}</p><strong>{lab.link} <span aria-hidden="true">↗</span></strong>
    </Link>)}</div></section>
  </div>
}
