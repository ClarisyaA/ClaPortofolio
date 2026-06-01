import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Home } from './pages/Home'
import './index.css'
import { Toaster } from './components/ui/toaster'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { StarBackground } from './components/StarBackground'
import { PageLoader } from './components/PageLoader'
import { ScrollToTop } from './components/ScrollToTop'
import { ScrollTopButton } from './components/ScrollTopButton'

const Experience = lazy(() => import('./pages/experience').then((module) => ({ default: module.Experience })))
const Blog = lazy(() => import('./pages/Blog').then((module) => ({ default: module.Blog })))
const NotFound = lazy(() => import('./pages/NotFound').then((module) => ({ default: module.NotFound })))

const knownRoutes = new Set(["/", "/experience", "/blog"])

function AppContent() {
  const location = useLocation()
  const showChrome = knownRoutes.has(location.pathname)

  return (
    <>
      <StarBackground />
      <div className="app-content-layer">
        <ScrollToTop />
        {showChrome && <Navbar />}
        {showChrome && <ScrollTopButton />}
        <Suspense fallback={<PageLoader fullScreen label="Loading page" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        {showChrome && <Footer />}
      </div>
    </>
  )
}

function App() {
  return (
    <div className="app-shell">
      <Toaster />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  )
}

export default App;
