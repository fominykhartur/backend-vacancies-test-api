import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Responses } from 'src/responses/responses.entity';
import { Users } from 'src/users/users.entity';
import { Vacancies } from 'src/vacancies/vacancies.entity';

export const getTypeormConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: +configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USERNAME'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_NAME'),
    entities: [Users, Vacancies, Responses],
    autoLoadEntities: true,
    synchronize: true,
  };
};
