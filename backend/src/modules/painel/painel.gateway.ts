import { Logger } from '@nestjs/common';
import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { PainelService } from './painel.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class PainelGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(PainelGateway.name);

  constructor(private readonly painelService: PainelService) {}

  handleConnection() {
    this.logger.log('Painel socket connected');
  }

  handleDisconnect() {
    this.logger.log('Painel socket disconnected');
  }
}
