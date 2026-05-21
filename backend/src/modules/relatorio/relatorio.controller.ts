import { Controller, Get } from '@nestjs/common';
import { RelatorioService } from './relatorio.service';

@Controller('relatorios')
export class RelatorioController {
  constructor(private readonly relatorioService: RelatorioService) {}

  @Get()
  getOverview() {
    return { reports: [] };
  }
}
