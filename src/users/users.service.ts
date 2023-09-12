import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { InsertResult, Repository } from 'typeorm';
import { CreateUser } from './dto/create-user.dto';
import { USERDATA_NOT_UNIQUE } from './users.constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async getUsers(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async createUser(dto: CreateUser): Promise<string> {
    try {
      await this.usersRepository.insert(dto);
    } catch {
      throw new HttpException(USERDATA_NOT_UNIQUE, HttpStatus.BAD_REQUEST);
    }
    return 'Пользователь успешно добавлен';
  }
}
