import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupportType } from '../data/support-types.entity';
import { Repository } from 'typeorm';
import { CreateSupportTypeDto, UpdateSupportTypeDto } from '../data/support-types.dto';
import { PaginateQuery, paginate } from 'nestjs-paginate';
import { DatabaseError } from 'pg';

@Injectable()
export class SupportTypesService {
  constructor(
    @InjectRepository(SupportType)
    private readonly repository: Repository<SupportType>,
  ) {}

  async createSupportType(dto: CreateSupportTypeDto) {
    try {
      return await this.repository.save(dto);
    } catch (error) {
      const myError = error as DatabaseError;

      if (myError.code === '23505') {
        throw new BadRequestException({ message: 'Support type already exists!' });
      }
    }
  }

  async getAllSupportTypes(query: PaginateQuery) {
    return await paginate(query, this.repository, {
      sortableColumns: ['name', 'description'],
    });
  }

  async getSupportTypeById(id: string) {
    try {
      return await this.repository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async updateSupportType(id: string, dto: UpdateSupportTypeDto) {
    try {
      return await this.repository.update(id, dto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteSupportType(id: string) {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async restoreSupportType(id: string) {
    try {
      return await this.repository.restore(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
