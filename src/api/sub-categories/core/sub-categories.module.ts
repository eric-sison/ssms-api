import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from '../data/sub-categories.entity';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoriesController } from './sub-categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategory])],
  providers: [SubCategoriesService],
  controllers: [SubCategoriesController],
})
export class SubCategoriesModule {}
