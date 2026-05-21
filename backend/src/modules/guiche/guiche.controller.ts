import { Controller, Get } from '@nestjs/common';
import { GuicheService } from './guiche.service';

@Controller('guiche')
export class GuicheController {
  constructor(private readonly guicheService: GuicheService) {}

  @Get()
  getStatus() {
    return { status: 'ok' };
  }
}
