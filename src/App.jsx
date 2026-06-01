import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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

function App() {
  return (
    <div className="app-shell">
      <Toaster />
      <BrowserRouter>
        <StarBackground />
        <div className="app-content-layer">
          <ScrollToTop />
          <Navbar />
          <ScrollTopButton />
          <Suspense fallback={<PageLoader fullScreen label="Loading page" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
