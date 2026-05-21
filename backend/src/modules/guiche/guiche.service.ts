import { Injectable } from '@nestjs/common';
import { GuicheRepository } from './guiche.repository';
import { QueueAlgorithmService } from './queue-algorithm.service';

@Injectable()
export class GuicheService {
  constructor(
    private readonly guicheRepository: GuicheRepository,
    private readonly queueAlgorithmService: QueueAlgorithmService,
  ) {}

  async getStatus() {
    return {
      ready: true,
      queueSize: 0,
    };
  }
}
