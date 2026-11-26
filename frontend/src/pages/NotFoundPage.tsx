import { Link } from 'react-router-dom'
export default function NotFoundPage() {
  return <div className="content-width"><header className="work-heading"><div><h1>Page not found</h1><p>Choose a laboratory to continue your visit.</p></div></header><Link className="gold-button" to="/">Return to the laboratories</Link></div>
}
