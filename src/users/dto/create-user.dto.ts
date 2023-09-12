import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import {
  WRONG_EMAIL_VALIDATION,
  WRONG_TELEPHONE_VALIDATION,
  WRONG_USERNAME_VALIDATION,
} from '../users.constants';

export class CreateUser {
  @ApiProperty({ description: 'Имя пользователя', example: 'user_example' })
  @IsString({ message: WRONG_USERNAME_VALIDATION })
  username: string;

  @ApiProperty({
    description: 'Электронный адрес пользователя',
    example: 'example@mail.ru',
  })
  @IsEmail({}, { message: WRONG_EMAIL_VALIDATION })
  email: string;

  @ApiProperty({
    nullable: true,
    required: false,
    description: 'Номер телефона пользователя',
    example: '+79215556655',
  })
  @IsOptional()
  @IsPhoneNumber('RU', { message: WRONG_TELEPHONE_VALIDATION })
  telephone?: string;
}
