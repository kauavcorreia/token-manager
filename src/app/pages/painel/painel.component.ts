import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TicketService } from '../../services/ticket.service';
import { Ticket, Guiche } from '../../models/ticket.model';

@Component({
  selector: 'app-painel',
  standalone: false,
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css'],
})
export class PainelComponent implements OnInit, OnDestroy {
  chamadas: Ticket[] = [];
  guiches: Guiche[] = [];
  hora = new Date();
  private subs: Subscription[] = [];
  private timer: any;

  constructor(private svc: TicketService) {}

  ngOnInit(): void {
    this.subs.push(
      this.svc.ultimasChamadasObs.subscribe(c => (this.chamadas = c)),
      this.svc.guichesObs.subscribe(g => (this.guiches = g)),
    );
    this.timer = setInterval(() => (this.hora = new Date()), 1000);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
    clearInterval(this.timer);
  }

  get atual(): Ticket | null { return this.chamadas[0] || null; }
  get historico(): Ticket[] { return this.chamadas.slice(1); }
}
