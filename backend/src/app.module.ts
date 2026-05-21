import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './infra/prisma/prisma.module';
import { PainelModule } from './modules/painel/painel.module';
import { AuthModule } from './modules/auth/auth.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { GuicheModule } from './modules/guiche/guiche.module';
import { RelatorioModule } from './modules/relatorio/relatorio.module';

@Module({
  imports: [ConfigModule, PrismaModule, PainelModule, AuthModule, TicketModule, GuicheModule, RelatorioModule],
})
export class AppModule {}
