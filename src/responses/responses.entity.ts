import { Users } from 'src/users/users.entity';
import { Vacancies } from 'src/vacancies/vacancies.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
  Unique,
} from 'typeorm';

@Entity()
@Index(['userId', 'vacancyId'], { unique: true })
// @Unique(['userId', 'vacancyId'])
export class Responses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  vacancyId: number;

  @Column({ default: false })
  isChecked: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Vacancies, (vacancy) => vacancy.responses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  vacancy: Vacancies;

  @ManyToOne(() => Users, (user) => user.responses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: Users;
}
