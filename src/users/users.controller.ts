import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './dto/create-user.dto';
import { Users } from './users.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { USERDATA_NOT_UNIQUE } from './users.constants';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Получение списка пользователей' })
  @ApiResponse({ status: 200, type: [Users] })
  @Get()
  async getUsers(): Promise<Users[]> {
    return this.usersService.getUsers();
  }

  @ApiOperation({ summary: 'Добавление нового пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно добавлен' })
  @ApiResponse({ status: 400, description: USERDATA_NOT_UNIQUE })
  @UsePipes(new ValidationPipe())
  @Post()
  async createUser(@Body() dto: CreateUser): Promise<string> {
    return this.usersService.createUser(dto);
  }
}
