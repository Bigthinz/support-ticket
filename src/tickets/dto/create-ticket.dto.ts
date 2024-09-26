import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum TicketPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export class CreateTicketDto {
  @ApiProperty({ description: 'The subject of the ticket' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ description: 'The description of the ticket' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    enum: TicketPriority,
    description: 'The priority of the ticket',
  })
  @IsEnum(TicketPriority)
  priority: TicketPriority;
}
