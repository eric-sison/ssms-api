import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SubCategory } from '../data/sub-categories.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubCategoryDto, UpdateSubCategoryDto } from '../data/sub-categories.dto';
import { PaginateQuery, paginate } from 'nestjs-paginate';
import { DatabaseError } from 'pg';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly repository: Repository<SubCategory>,
  ) {}

  async createSubCategory(dto: CreateSubCategoryDto) {
    try {
      return await this.repository.save(dto);
    } catch (error) {
      const myError = error as DatabaseError;

      if (myError.code === '23505') {
        throw new BadRequestException({ message: 'Sub-category already exists!' });
      }
    }
  }

  async getAllSubCategories(query: PaginateQuery) {
    return await paginate(query, this.repository, {
      relations: { category: true },
      sortableColumns: ['name', 'description'],
      loadEagerRelations: true,
    });
  }

  async getSubCategoryById(id: string) {
    try {
      return await this.repository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async updateSubCategory(id: string, dto: UpdateSubCategoryDto) {
    try {
      return await this.repository.update(id, dto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteSubCategory(id: string) {
    try {
      return await this.repository.softDelete(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async restore(id: string) {
    try {
      return await this.repository.restore(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
