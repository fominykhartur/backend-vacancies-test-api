import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacancies } from './vacancies.entity';
import { FindOptionsOrder, ObjectId, Repository, UpdateResult } from 'typeorm';
import { CreateVacancy } from './dto/create-vacancy.dto';
import { FilterVacancies } from './dto/filter-vacancies.dto';
import { LIMIT, PAGE, SORT_BY, SORT_ORDER } from './vacancies.constants';
import { UpdateVacancy } from './dto/update-vacancy.dto';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(Vacancies)
    private vacanciesRepository: Repository<Vacancies>,
  ) {}

  async createVacancy(dto: CreateVacancy): Promise<string> {
    await this.vacanciesRepository.insert(dto);
    return 'Вакансия успешно добавлена';
  }

  async updateVacancy(id: number, dto: UpdateVacancy): Promise<string> {
    console.log({ ...dto });
    await this.vacanciesRepository.update({ id }, { ...dto });
    return `Вакансия ${id} успешно обновлена`;
  }

  async getVacancies(query: FilterVacancies) {
    const take = query.limit || LIMIT;
    const page = query.page || PAGE;
    const skip = (page - 1) * take;
    const sortBy = query.sortBy || SORT_BY;
    const sortOrder = query.sortOrder || SORT_ORDER;

    return this.vacanciesRepository.findAndCount({
      take: take,
      skip: skip,
      order: { [sortBy]: sortOrder },
    });
  }
}
