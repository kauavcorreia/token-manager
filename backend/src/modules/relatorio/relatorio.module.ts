import { Module } from '@nestjs/common';
import { RelatorioController } from './relatorio.controller';
import { RelatorioService } from './relatorio.service';
import { RelatorioRepository } from './relatorio.repository';

@Module({
  controllers: [RelatorioController],
  providers: [RelatorioService, RelatorioRepository],
  exports: [RelatorioService],
})
export class RelatorioModule {}
