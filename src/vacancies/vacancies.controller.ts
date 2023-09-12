import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { CreateVacancy } from './dto/create-vacancy.dto';
import { FilterVacancies } from './dto/filter-vacancies.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { Vacancies } from './vacancies.entity';
import { UpdateVacancy } from './dto/update-vacancy.dto';
import { ResponsesService } from 'src/responses/responses.service';
import { RESPONSE_CREATING_ERROR } from 'src/responses/responses.constants';
import { CreateResponse } from './dto/create-response.dto';

@ApiTags('Vacancies')
@Controller('vacancies')
export class VacanciesController {
  constructor(
    private readonly vacanciesService: VacanciesService,
    private readonly responsesService: ResponsesService,
  ) {}

  @ApiOperation({
    summary: 'Получение списка вакансий',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: 'string',
    description:
      'Сортировка по полям createdAt, skills, userId, name. По-умолчанию createdAt',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    type: 'string',
    description: 'Направление сортировки asc/desc, по-умолчанию ASC',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number',
    description: 'Количевство вакансий, по-умолчанию 10',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: 'number',
    description: 'Номер страницы, по-умолчанию 1',
  })
  @ApiResponse({ status: 200, type: [Vacancies] })
  @Get()
  async getVacancies(@Query() query: FilterVacancies) {
    return this.vacanciesService.getVacancies(query);
  }

  @ApiOperation({ summary: 'Добавление вакансии' })
  @ApiResponse({ status: 201, description: 'Вакансия успешно добавлен' })
  @UsePipes(new ValidationPipe())
  @Post()
  async createVacancy(@Body() dto: CreateVacancy) {
    return this.vacanciesService.createVacancy(dto);
  }

  @ApiOperation({ summary: 'Обновление вакансии' })
  @ApiResponse({ status: 200, description: 'Вакансия id успешно обновлена' })
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async updateVacancy(
    @Param('id') id: number,
    @Body() dto: UpdateVacancy,
  ): Promise<string> {
    return this.vacanciesService.updateVacancy(id, dto);
  }

  @ApiOperation({ summary: 'Отклик на вакансию' })
  @ApiResponse({ status: 200, description: 'Отклик успешно создан' })
  @ApiResponse({ status: 400, description: RESPONSE_CREATING_ERROR })
  @UsePipes(new ValidationPipe())
  @Post(':id')
  async createResponse(
    @Param('id') vacancyId: number,
    @Body() dto: CreateResponse,
  ) {
    return this.responsesService.createResponse(vacancyId, dto.userId);
  }
}
