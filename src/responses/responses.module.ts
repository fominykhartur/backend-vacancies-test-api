import { Module } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { Responses } from './responses.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Responses])],
  providers: [ResponsesService],
  exports: [ResponsesService],
})
export class ResponsesModule {}
