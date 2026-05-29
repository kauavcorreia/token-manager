import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TicketService } from '../../services/ticket.service';
import { Ticket, Guiche } from '../../models/ticket.model';

@Component({
  selector: 'app-atendente',
  standalone: false,
  templateUrl: './atendente.component.html',
  styleUrls: ['./atendente.component.css'],
})
export class AtendenteComponent implements OnInit, OnDestroy {
  guiches: Guiche[] = [];
  chamadas: Ticket[] = [];
  msg = '';
  msgTipo: 'ok' | 'err' | '' = '';
  private subs: Subscription[] = [];

  constructor(private svc: TicketService) {}

  ngOnInit(): void {
    this.subs.push(
      this.svc.guichesObs.subscribe(g => (this.guiches = g)),
      this.svc.ultimasChamadasObs.subscribe(c => (this.chamadas = c)),
    );
  }

  ngOnDestroy(): void { this.subs.forEach(s => s.unsubscribe()); }

  get filas() { return this.svc.filas; }

  chamar(n: number): void {
    const t = this.svc.chamarProximo(n);
    t ? this.flash(`Senha ${t.numeracao} → Guichê ${n}`, 'ok')
      : this.flash('Nenhuma senha na fila ou guichê ocupado.', 'err');
  }

  encerrar(): void {
    if (!confirm('Encerrar expediente? Senhas restantes serão descartadas.')) return;
    this.svc.encerrarExpediente();
    this.flash('Expediente encerrado. Senhas descartadas.', 'ok');
  }

  private flash(m: string, t: 'ok' | 'err'): void {
    this.msg = m; this.msgTipo = t;
    setTimeout(() => { this.msg = ''; this.msgTipo = ''; }, 3500);
  }
}
