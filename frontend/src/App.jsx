// File: frontend/src/App.jsx

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import YCP from './pages/YCP'
import Awards from './pages/Awards'
import About from './pages/About'
import Contact from './pages/Contact'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ycp" element={<YCP />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#42A5F5',
            color: '#fff',
            fontFamily: 'Fredoka, system-ui, sans-serif',
            fontWeight: '600',
            borderRadius: '2rem',
            padding: '1rem 1.5rem',
          },
        }}
      />
    </div>
  )
}

export default App