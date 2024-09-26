import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from './schemas/ticket.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';
// import { Ticket, TicketDocument } from './schemas/ticket.schema';
// import { CreateTicketDto } from './dto/create-ticket.dto';
// import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';

@Injectable()
export class TicketsRepository {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const createdTicket = new this.ticketModel(createTicketDto);
    return createdTicket.save();
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketModel.find().exec();
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketModel.findById(id).exec();
    if (!ticket) {
      throw new NotFoundException(`Ticket #${id} not found`);
    }
    return ticket;
  }

  async updateStatus(
    id: string,
    updateTicketStatusDto: UpdateTicketStatusDto,
  ): Promise<Ticket> {
    const updatedTicket = await this.ticketModel
      .findByIdAndUpdate(
        id,
        { status: updateTicketStatusDto.status },
        { new: true },
      )
      .exec();
    if (!updatedTicket) {
      throw new NotFoundException(`Ticket #${id} not found`);
    }
    return updatedTicket;
  }

  async deleteTicket(id: string): Promise<Ticket | null> {
    const deletedTicket = await this.ticketModel.findByIdAndDelete(id).lean();
    return deletedTicket;
  }
}
