import { ApiProperty } from '@nestjs/swagger';
import { Responses } from 'src/responses/responses.entity';
import { Users } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Vacancies {
  @ApiProperty({
    description: 'Уникальный идентификатор вакансии',
    example: '1',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Название вакансии',
    example: 'Backend-разработчик',
  })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({
    description: 'Описание вакансии',
    example: 'Ищем в команду junior разработчика',
    nullable: true,
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    description: 'Набор навыков',
    example: '[“javascript“, “node.js“]',
    isArray: true,
  })
  @Column('text', { array: true, nullable: true })
  skills: string[];

  @ApiProperty({
    description: 'Пользователь, создавший вакансию',
    example: '1',
  })
  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Users, (user) => user.vacancies, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: Users;

  @OneToMany(() => Responses, (response) => response.vacancy)
  responses: Responses[];
}
