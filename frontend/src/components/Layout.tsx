import React from 'react'

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Sistema de Filas - Laboratório Médico</h1>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2026 Sistema Acadêmico de Gerenciamento de Filas</p>
      </footer>
    </div>
  )
}
