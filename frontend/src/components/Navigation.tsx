import { NavLink } from 'react-router-dom'

const pages = [
  ['/', 'Overview'], ['/cipher-lab', 'Cipher Lab'], ['/katapayadi-lab', 'Kaṭapayādi'], ['/cipher-breaking', 'Breaking Studio'],
]

export default function Navigation() {
  return <header className="site-header"><div className="top-rule"></div><div className="nav-wrap">
    <NavLink to="/" className="brand" aria-label="GUPT home"><img src="/gupt-seal.jpg" alt="" width="42" height="42" />
      <span><strong>GUPT <em lang="sa">गुप्त</em></strong><small>Ancient Indian Cipher Lab</small></span></NavLink>
    <nav aria-label="Main navigation">{pages.map(([path, label]) => <NavLink key={path} end to={path}>{label}</NavLink>)}</nav>
  </div></header>
}
