import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { RelatorioItem } from '../../models/ticket.model';

@Component({
  selector: 'app-relatorio',
  standalone: false,
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css'],
})
export class RelatorioComponent {
  tipo: 'diario' | 'mensal' = 'diario';
  data: string = new Date().toISOString().split('T')[0];
  mes: number = new Date().getMonth() + 1;
  ano: number = new Date().getFullYear();
  relatorio: RelatorioItem | null = null;

  meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
           'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

  constructor(private svc: TicketService) {}

  gerar(): void {
    this.relatorio = this.tipo === 'diario'
      ? this.svc.gerarRelatorioDiario(new Date(this.data + 'T12:00:00'))
      : this.svc.gerarRelatorioMensal(this.ano, this.mes);
  }

  taxa(e: number, a: number): string {
    return e ? ((a / e) * 100).toFixed(1) + '%' : '0%';
  }
}
