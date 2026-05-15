import { Module } from '@nestjs/common';
import { TicketModule } from './modules/ticket/ticket.module';
import { GuicheModule } from './modules/guiche/guiche.module';
import { RelatorioModule } from './modules/relatorio/relatorio.module';
import { PainelGateway } from './gateway/painel.gateway';

@Module({
  imports: [TicketModule, GuicheModule, RelatorioModule],
  providers: [PainelGateway],
})
export class AppModule {}
