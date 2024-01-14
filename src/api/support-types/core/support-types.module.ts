import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportType } from '../data/support-types.entity';
import { SupportTypesService } from './support-types.service';
import { SupportTypesController } from './support-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SupportType])],
  providers: [SupportTypesService],
  controllers: [SupportTypesController],
})
export class SupportTypesModule {}
