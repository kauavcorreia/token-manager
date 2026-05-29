export interface Guiche {
  id: string
  numero: number
  status: 'LIVRE' | 'OCUPADO'
  ticketAtualId?: string
}
