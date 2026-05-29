export type TipoSenha = 'SP' | 'SG' | 'SE';

export interface Ticket {
  numeracao: string;
  tipo: TipoSenha;
  sequencia: number;
  dataHoraEmissao: Date;
  dataHoraAtendimento?: Date;
  guiche?: number;
  atendida: boolean;
  descartada: boolean;
}

export interface Guiche {
  numero: number;
  disponivel: boolean;
  ticketAtual?: Ticket;
}

export interface RelatorioItem {
  periodo: string;
  totalEmitidas: number;
  totalAtendidas: number;
  emitidas: { SP: number; SG: number; SE: number };
  atendidas: { SP: number; SG: number; SE: number };
  tickets: Ticket[];
  tmMedio: { SP: number; SG: number; SE: number };
}
