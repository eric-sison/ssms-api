import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../data/categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from '../data/categories.dto';
import { PaginateQuery, paginate } from 'nestjs-paginate';
import { DatabaseError } from 'pg';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async createCategory(dto: CreateCategoryDto) {
    try {
      return await this.repository.save(dto);
    } catch (error) {
      const myError = error as DatabaseError;

      if (myError.code === '23505') {
        throw new BadRequestException({ message: 'Category name already exists!' });
      }
    }
  }

  async getAllCategories(query: PaginateQuery) {
    return await paginate(query, this.repository, {
      sortableColumns: ['name', 'description'],
    });
  }

  async getCategoryById(id: string) {
    try {
      return await this.repository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async updateCategory(id: string, dto: UpdateCategoryDto) {
    try {
      return await this.repository.update(id, dto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteCategory(id: string) {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async restoreCategory(id: string) {
    try {
      return await this.repository.restore(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
