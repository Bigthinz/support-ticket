import { Injectable } from '@nestjs/common';
import { TicketsRepository } from './tickets.repository';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';

@Injectable()
export class TicketsService {
  constructor(private readonly ticketsRepository: TicketsRepository) {}

  create(createTicketDto: CreateTicketDto) {
    return this.ticketsRepository.create(createTicketDto);
  }

  findAll() {
    return this.ticketsRepository.findAll();
  }

  findOne(id: string) {
    return this.ticketsRepository.findOne(id);
  }

  updateStatus(id: string, updateTicketStatusDto: UpdateTicketStatusDto) {
    return this.ticketsRepository.updateStatus(id, updateTicketStatusDto);
  }

  remove(id: string) {
    return this.ticketsRepository.deleteTicket(id);
  }
}
