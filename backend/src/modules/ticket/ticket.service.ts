import { Injectable } from '@nestjs/common';
import { TicketRepository } from './ticket.repository';

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepository) {}

  async list() {
    return [];
  }
}
