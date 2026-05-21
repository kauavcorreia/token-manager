import { Injectable } from '@nestjs/common';
import { RelatorioRepository } from './relatorio.repository';

@Injectable()
export class RelatorioService {
  constructor(private readonly relatorioRepository: RelatorioRepository) {}

  async getSummary() {
    return [];
  }
}
