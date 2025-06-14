import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { useState } from 'react'
import './index.css';
import { Toaster } from './components/ui/toaster';
import { Footer } from './components/Footer';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Toaster />
      <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path = '*' element = {<NotFound />}/>
      </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
