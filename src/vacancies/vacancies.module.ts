import { Module } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { VacanciesController } from './vacancies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacancies } from './vacancies.entity';
import { ResponsesModule } from 'src/responses/responses.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vacancies]), ResponsesModule],
  providers: [VacanciesService],
  controllers: [VacanciesController],
})
export class VacanciesModule {}
