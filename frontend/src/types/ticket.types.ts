export interface Ticket {
  id: string
  token: string
  type: 'SP' | 'SE' | 'SG'
  status: 'AGUARDANDO' | 'ATENDENDO' | 'ATENDIDO' | 'NAO_COMPARECEU'
  createdAt: Date
  startedAt?: Date
  finishedAt?: Date
}

export type TicketType = 'SP' | 'SE' | 'SG'
