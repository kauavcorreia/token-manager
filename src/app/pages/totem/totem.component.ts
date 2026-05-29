import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket, TipoSenha } from '../../models/ticket.model';

@Component({
  selector: 'app-totem',
  standalone: false,
  templateUrl: './totem.component.html',
  styleUrls: ['./totem.component.css'],
})
export class TotemComponent {
  ticketEmitido: Ticket | null = null;
  animando = false;

  constructor(private svc: TicketService) {}

  emitir(tipo: TipoSenha): void {
    this.ticketEmitido = this.svc.emitirSenha(tipo);
    this.animando = true;
    setTimeout(() => (this.animando = false), 500);
  }

  nova(): void { this.ticketEmitido = null; }

  get tipoLabel(): string {
    const m: Record<TipoSenha, string> = { SP: 'Prioritário', SG: 'Geral', SE: 'Retirada de Exames' };
    return this.ticketEmitido ? m[this.ticketEmitido.tipo] : '';
  }
}
