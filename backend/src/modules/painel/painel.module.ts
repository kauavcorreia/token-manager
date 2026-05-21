import { Module } from '@nestjs/common';
import { PainelGateway } from './painel.gateway';
import { PainelService } from './painel.service';

@Module({
  providers: [PainelGateway, PainelService],
  exports: [PainelService],
})
export class PainelModule {}
