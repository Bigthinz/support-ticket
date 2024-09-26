import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum TicketStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

export class UpdateTicketStatusDto {
  @ApiProperty({
    enum: TicketStatus,
    description: 'The new status of the ticket',
  })
  @IsEnum(TicketStatus)
  status: TicketStatus;
}
