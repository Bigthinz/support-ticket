import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Ticket } from './schemas/ticket.schema';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe';
import { Types } from 'mongoose';

@ApiTags('tickets')
@ApiBearerAuth()
@Controller('tickets')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The ticket has been successfully created.',
    type: Ticket,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateTicketDto })
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Return all tickets.',
    type: [Ticket],
  })
  findAll() {
    return this.ticketsService.findAll();
  }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.ticketsService.findOne(id);
  //   }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', description: 'Ticket ID' })
  @ApiResponse({
    status: 200,
    description: 'Return a ticket by ID.',
    type: Ticket,
  })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  findOne(@Param('id', new ParseObjectIdPipe()) id: Types.ObjectId) {
    return this.ticketsService.findOne(id.toString());
  }

  @Patch(':id/status')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Ticket ID (MongoDB ObjectId)',
  })
  @ApiResponse({
    status: 200,
    description: 'The ticket status has been successfully updated.',
    type: Ticket,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  @ApiBody({ type: UpdateTicketStatusDto })
  updateStatus(
    @Param('id', new ParseObjectIdPipe()) id: Types.ObjectId,
    @Body() updateTicketStatusDto: UpdateTicketStatusDto,
  ) {
    return this.ticketsService.updateStatus(
      id.toString(),
      updateTicketStatusDto,
    );
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string', description: 'Ticket ID' })
  @ApiResponse({
    status: 200,
    description: 'The ticket has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  remove(@Param('id', new ParseObjectIdPipe()) id: Types.ObjectId) {
    return this.ticketsService.remove(id.toString());
  }
}
