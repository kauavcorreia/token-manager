import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// Pages
import Totem from '@/pages/Totem/Totem'
import Guiche from '@/pages/Guiche/Guiche'
import Painel from '@/pages/Painel/Painel'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/totem" element={<Totem />} />
        <Route path="/guiche/:id" element={<Guiche />} />
        <Route path="/painel" element={<Painel />} />
        <Route path="/" element={<div className="flex items-center justify-center h-screen">Sistema de Gerenciamento de Filas</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
