import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { WRONG_USER_VALIDATION } from '../vacancies.constants';

export class CreateResponse {
  @ApiProperty({
    description: 'Пользователь, создавший вакансию',
    example: '1',
  })
  @IsNumber({}, { message: WRONG_USER_VALIDATION })
  userId: number;
}
