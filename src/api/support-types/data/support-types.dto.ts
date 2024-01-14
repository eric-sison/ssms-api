import { PartialType } from '@nestjs/swagger';

export class CreateSupportTypeDto {
  name: string;
  description: string;
}

export class UpdateSupportTypeDto extends PartialType(CreateSupportTypeDto) {}
