import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  SKILLS_IS_NOT_ARRAY,
  SKILLS_IS_NOT_STRING,
  WRONG_AUTHOR_VALIDATION,
  WRONG_DESCRIPTION_LENGTH_VALIDATION,
  WRONG_DESCRIPTION_VALIDATION,
  WRONG_VACANCY_NAME_VALIDATION,
} from '../vacancies.constants';

export class CreateVacancy {
  @ApiProperty({
    description: 'Название вакансии',
    example: 'Backend-разработчик',
  })
  @IsString({ message: WRONG_VACANCY_NAME_VALIDATION })
  name: string;

  @ApiProperty({
    description: 'Описание вакансии',
    example: 'Ищем в команду junior разработчика',
    nullable: true,
    required: false,
  })
  @IsString({ message: WRONG_DESCRIPTION_VALIDATION })
  @MaxLength(300, { message: WRONG_DESCRIPTION_LENGTH_VALIDATION })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Набор навыков',
    example: '[“javascript“, “node.js“]',
    isArray: true,
    nullable: true,
    required: false,
  })
  @IsArray({ message: SKILLS_IS_NOT_ARRAY })
  @IsString({ each: true, message: SKILLS_IS_NOT_STRING })
  @IsOptional()
  skills?: string[];

  @ApiProperty({
    description: 'Пользователь, создавший вакансию',
    example: '1',
  })
  @IsNumber({}, { message: WRONG_AUTHOR_VALIDATION })
  userId: number;
}
