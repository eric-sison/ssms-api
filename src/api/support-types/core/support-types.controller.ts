import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SupportTypesService } from './support-types.service';
import { CreateSupportTypeDto, UpdateSupportTypeDto } from '../data/support-types.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller({ version: '1', path: 'support-types' })
export class SupportTypesController {
  constructor(private readonly supportTypesService: SupportTypesService) {}

  @Post()
  async create(@Body() dto: CreateSupportTypeDto) {
    console.log(dto);
    return await this.supportTypesService.createSupportType(dto);
  }

  @Get()
  async getAll(@Paginate() query: PaginateQuery) {
    return await this.supportTypesService.getAllSupportTypes(query);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.supportTypesService.getSupportTypeById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, dto: UpdateSupportTypeDto) {
    return await this.supportTypesService.updateSupportType(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.supportTypesService.deleteSupportType(id);
  }

  @Post(':id')
  async restore(@Param('id') id: string) {
    return await this.supportTypesService.restoreSupportType(id);
  }
}
