import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from '../data/categories.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { UpdateSupportTypeDto } from 'src/api/support-types/data/support-types.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller({ version: '1', path: 'categories' })
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    return await this.categoriesService.createCategory(dto);
  }

  @Get()
  async getAll(@Paginate() query: PaginateQuery) {
    return await this.categoriesService.getAllCategories(query);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.categoriesService.getCategoryById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, dto: UpdateSupportTypeDto) {
    return await this.categoriesService.updateCategory(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.categoriesService.deleteCategory(id);
  }

  @Post(':id')
  async restore(@Param('id') id: string) {
    return await this.categoriesService.restoreCategory(id);
  }
}
