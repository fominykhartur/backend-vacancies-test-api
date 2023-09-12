import { ApiProperty } from '@nestjs/swagger';
import { Responses } from 'src/responses/responses.entity';
import { Vacancies } from 'src/vacancies/vacancies.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Users {
  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: '1',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'имя пользователя', example: 'user123' })
  @Column({ unique: true, nullable: false })
  username: string;

  @ApiProperty({
    description: 'электронная почта пользователя',
    example: 'user123@mail.ru',
  })
  @Column({ unique: true, nullable: false })
  email: string;

  @ApiProperty({
    nullable: true,
    required: false,
    description: 'Номер телефона пользователя',
    example: '+79215556655',
  })
  @Column({ unique: true, nullable: true })
  telephone: string;

  @ApiProperty({
    description: 'Дата создания записи',
    example: '2023-09-07 23:02:42.555',
  })
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Vacancies, (vacancy) => vacancy.user)
  vacancies: Vacancies[];

  @OneToMany(() => Responses, (response) => response.user)
  responses: Responses[];
}
