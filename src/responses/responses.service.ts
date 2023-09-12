import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Responses } from './responses.entity';
import { Repository } from 'typeorm';
import { RESPONSE_CREATING_ERROR } from './responses.constants';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectRepository(Responses)
    private responsesRepository: Repository<Responses>,
  ) {}

  async createResponse(vacancyId: number, userId: number) {
    try {
      await this.responsesRepository.insert({ vacancyId, userId });
    } catch {
      throw new HttpException(RESPONSE_CREATING_ERROR, HttpStatus.BAD_REQUEST);
    }

    return 'Отклик успешно создан';
  }
}
