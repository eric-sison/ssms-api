import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { CreateSubCategoryDto, UpdateSubCategoryDto } from '../data/sub-categories.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { TransformSubCategoryInterceptor } from '../misc/sub-categories.interceptor';

@Controller({ version: '1', path: 'sub-categories' })
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Post()
  async create(@Body() dto: CreateSubCategoryDto) {
    return await this.subCategoriesService.createSubCategory(dto);
  }

  @UseInterceptors(TransformSubCategoryInterceptor)
  @Get()
  async getAll(@Paginate() query: PaginateQuery) {
    return await this.subCategoriesService.getAllSubCategories(query);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.subCategoriesService.getSubCategoryById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateSubCategoryDto) {
    return await this.subCategoriesService.updateSubCategory(id, dto);
  }

  @Delete(':id')
  async restore(@Param('id') id: string) {
    return await this.subCategoriesService.restore(id);
  }
}
