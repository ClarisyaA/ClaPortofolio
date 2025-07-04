import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Experience } from './pages/experience'
import { Blog } from './pages/Blog'
import { useState } from 'react'
import './index.css'
import { Toaster } from './components/ui/toaster'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;
