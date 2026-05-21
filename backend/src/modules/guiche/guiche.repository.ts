import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';

@Injectable()
export class GuicheRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Add Prisma query helpers for the guichê domain here
}
