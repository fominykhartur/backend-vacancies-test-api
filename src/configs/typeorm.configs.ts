import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Responses } from 'src/responses/responses.entity';
import { Users } from 'src/users/users.entity';
import { Vacancies } from 'src/vacancies/vacancies.entity';

export const getTypeormConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  console.log(configService.get('POSTGRES_HOST'));
  console.log(configService.get('POSTGRES_PORT'));
  console.log(configService.get('POSTGRES_USERNAME'));
  console.log(configService.get('POSTGRES_PASSWORD'));
  console.log(configService.get('POSTGRES_DB'));
  return {
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: +configService.get('POSTGRESS_PORT'),
    username: configService.get('POSTGRES_USERNAME'),
    password: configService.get('POSTGRESS_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [Users, Vacancies, Responses],
    autoLoadEntities: true,
    synchronize: true,
  };
};
