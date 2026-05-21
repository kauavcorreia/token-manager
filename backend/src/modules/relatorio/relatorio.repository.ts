import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';

@Injectable()
export class RelatorioRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Add report-specific SQL and aggregation helpers here
}
