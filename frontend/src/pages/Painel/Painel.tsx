import React from 'react'
import { Layout } from '@/components/Layout'

const Painel: React.FC = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <p>Página do Painel - Últimas Chamadas</p>
      </div>
    </Layout>
  )
}

export default Painel
