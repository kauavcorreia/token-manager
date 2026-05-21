import { Module } from '@nestjs/common';
import { GuicheController } from './guiche.controller';
import { GuicheService } from './guiche.service';
import { GuicheRepository } from './guiche.repository';
import { GuicheGateway } from './guiche.gateway';
import { QueueAlgorithmService } from './queue-algorithm.service';

@Module({
  controllers: [GuicheController],
  providers: [GuicheService, GuicheRepository, GuicheGateway, QueueAlgorithmService],
  exports: [GuicheService],
})
export class GuicheModule {}
