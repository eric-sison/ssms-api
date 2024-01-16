import { PartialType } from '@nestjs/swagger';
import { Category } from 'src/api/categories/data/categories.entity';

export class CreateSubCategoryDto {
  category: Category;
  name: string;
  description: string;
}

export class UpdateSubCategoryDto extends PartialType(CreateSubCategoryDto) {}
