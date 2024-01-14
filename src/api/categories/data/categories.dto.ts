import { PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  name: string;
  description: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
