import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ticket, TipoSenha, Guiche, RelatorioItem } from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly NUM_GUICHES = 3;

  private sequencias: Record<TipoSenha, number> = { SP: 0, SG: 0, SE: 0 };
  private dataAtual = '';

  private filaSP: Ticket[] = [];
  private filaSG: Ticket[] = [];
  private filaSE: Ticket[] = [];
  private historico: Ticket[] = [];

  private _ultimasChamadas$ = new BehaviorSubject<Ticket[]>([]);
  private _guiches$ = new BehaviorSubject<Guiche[]>([]);

  get ultimasChamadasObs() { return this._ultimasChamadas$.asObservable(); }
  get guichesObs() { return this._guiches$.asObservable(); }

  private guiches: Guiche[] = Array.from({ length: this.NUM_GUICHES }, (_, i) => ({
    numero: i + 1, disponivel: true,
  }));

  private ultimoTipoChamado: 'SP' | 'outro' = 'outro';

  constructor() { this._guiches$.next([...this.guiches]); }

  get filas() {
    return { SP: [...this.filaSP], SG: [...this.filaSG], SE: [...this.filaSE] };
  }

  emitirSenha(tipo: TipoSenha): Ticket {
    this.resetarDiaSePreciso();
    this.sequencias[tipo]++;
    const numeracao = `${this.dataAtual}-${tipo}${String(this.sequencias[tipo]).padStart(2, '0')}`;
    const ticket: Ticket = {
      numeracao, tipo, sequencia: this.sequencias[tipo],
      dataHoraEmissao: new Date(), atendida: false,
      descartada: Math.random() < 0.05,
    };
    this.historico.push(ticket);
    if (!ticket.descartada) {
      if (tipo === 'SP') this.filaSP.push(ticket);
      else if (tipo === 'SG') this.filaSG.push(ticket);
      else this.filaSE.push(ticket);
    }
    return ticket;
  }

  chamarProximo(guicheNumero: number): Ticket | null {
    const guiche = this.guiches.find(g => g.numero === guicheNumero);
    if (!guiche || !guiche.disponivel) return null;
    const proximo = this.selecionarProximo();
    if (!proximo) return null;
    const tm = this.calcularTM(proximo.tipo);
    proximo.dataHoraAtendimento = new Date();
    proximo.guiche = guicheNumero;
    proximo.atendida = true;
    guiche.disponivel = false;
    guiche.ticketAtual = proximo;
    this._guiches$.next([...this.guiches]);
    this._ultimasChamadas$.next([proximo, ...this._ultimasChamadas$.value].slice(0, 5));
    setTimeout(() => {
      guiche.disponivel = true;
      guiche.ticketAtual = undefined;
      this._guiches$.next([...this.guiches]);
    }, tm * 60 * 1000);
    return proximo;
  }

  private selecionarProximo(): Ticket | null {
    if (this.ultimoTipoChamado === 'outro') {
      if (this.filaSP.length) { this.ultimoTipoChamado = 'SP'; return this.filaSP.shift()!; }
    }
    if (this.ultimoTipoChamado === 'SP') {
      if (this.filaSE.length) { this.ultimoTipoChamado = 'outro'; return this.filaSE.shift()!; }
      if (this.filaSG.length) { this.ultimoTipoChamado = 'outro'; return this.filaSG.shift()!; }
      if (this.filaSP.length) return this.filaSP.shift()!;
    }
    if (this.filaSP.length) { this.ultimoTipoChamado = 'SP'; return this.filaSP.shift()!; }
    if (this.filaSE.length) { this.ultimoTipoChamado = 'outro'; return this.filaSE.shift()!; }
    if (this.filaSG.length) { this.ultimoTipoChamado = 'outro'; return this.filaSG.shift()!; }
    return null;
  }

  calcularTM(tipo: TipoSenha): number {
    if (tipo === 'SP') return Math.max(1, 15 + (Math.random() * 10 - 5));
    if (tipo === 'SG') return Math.max(1, 5 + (Math.random() * 6 - 3));
    return Math.random() < 0.95 ? 1 : 5;
  }

  encerrarExpediente(): void {
    [...this.filaSP, ...this.filaSE, ...this.filaSG].forEach(t => (t.descartada = true));
    this.filaSP = []; this.filaSE = []; this.filaSG = [];
  }

  gerarRelatorioDiario(data?: Date): RelatorioItem {
    const ref = data || new Date();
    const dStr = this.formataYYMMDD(ref);
    return this.compilar(`Diário — ${ref.toLocaleDateString('pt-BR')}`,
      this.historico.filter(t => t.numeracao.startsWith(dStr)));
  }

  gerarRelatorioMensal(ano: number, mes: number): RelatorioItem {
    const prefixo = `${String(ano).slice(-2)}${String(mes).padStart(2, '0')}`;
    return this.compilar(`Mensal — ${String(mes).padStart(2, '0')}/${ano}`,
      this.historico.filter(t => t.numeracao.startsWith(prefixo)));
  }

  private compilar(periodo: string, tickets: Ticket[]): RelatorioItem {
    const atendidas = tickets.filter(t => t.atendida);
    const count = (l: Ticket[]) => ({
      SP: l.filter(t => t.tipo === 'SP').length,
      SG: l.filter(t => t.tipo === 'SG').length,
      SE: l.filter(t => t.tipo === 'SE').length,
    });
    const tmMedio = { SP: 0, SG: 0, SE: 0 };
    (['SP', 'SG', 'SE'] as TipoSenha[]).forEach(tipo => {
      const l = atendidas.filter(t => t.tipo === tipo && t.dataHoraAtendimento);
      if (l.length) {
        tmMedio[tipo] = +(l.reduce((a, t) =>
          a + (t.dataHoraAtendimento!.getTime() - t.dataHoraEmissao.getTime()) / 60000, 0) / l.length).toFixed(2);
      }
    });
    return { periodo, totalEmitidas: tickets.length, totalAtendidas: atendidas.length,
      emitidas: count(tickets), atendidas: count(atendidas), tickets, tmMedio };
  }

  private resetarDiaSePreciso(): void {
    const hoje = this.formataYYMMDD(new Date());
    if (this.dataAtual !== hoje) { this.dataAtual = hoje; this.sequencias = { SP: 0, SG: 0, SE: 0 }; }
  }

  private formataYYMMDD(d: Date): string {
    return `${String(d.getFullYear()).slice(-2)}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
  }
}
