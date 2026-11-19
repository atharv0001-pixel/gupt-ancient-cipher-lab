import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import CipherLabPage from './pages/CipherLabPage'
import KatapayadiLabPage from './pages/KatapayadiLabPage'
import CipherBreakingPage from './pages/CipherBreakingPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cipher-lab" element={<CipherLabPage />} />
        <Route path="/katapayadi-lab" element={<KatapayadiLabPage />} />
        <Route path="/cipher-breaking" element={<CipherBreakingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
