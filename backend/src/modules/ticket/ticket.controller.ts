import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAll(@Req() request: any) {
    // request.user foi atribuído no AuthGuard após a validação do token
    const user = request.user;
    return { tickets: [], user };
  }
}
