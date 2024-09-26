import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.password;
      return ret;
    },
  },
})
export class User {
  @ApiProperty({
    example: 'john@example.com',
    description: 'The email of the user',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: 'user',
    description: 'The role of the user',
    enum: ['user', 'admin', 'support'],
  })
  @Prop({ required: true, enum: ['user', 'admin', 'support'], default: 'user' })
  role: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'The creation date of the user',
  })
  @Prop()
  createdAt?: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'The last update date of the user',
  })
  @Prop()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserWithoutPassword = Omit<User, 'password'>;
