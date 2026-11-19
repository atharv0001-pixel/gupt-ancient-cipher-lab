import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Navigation from '../components/Navigation'
import '../labs.css'

export default function MainLayout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = (document.querySelector('main h1')?.textContent ?? 'Laboratories') + ' · GUPT'
  }, [pathname])
  return <div className="app-shell"><a className="skip" href="#content">Skip to workspace</a><Navigation />
    <main id="content" tabIndex={-1}><Outlet /></main>
    <footer className="site-footer"><span>GUPT <b>·</b> Indian Knowledge Systems</span><Link to="/">Explore the laboratories ↑</Link></footer>
  </div>
}
