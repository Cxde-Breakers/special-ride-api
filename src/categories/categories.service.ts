import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Status } from 'src/shared/enums/status.enum';
import { CategoryQueryDto } from './dto/category-query.dto';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) { }
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create({
        ...createCategoryDto
      });

      await this.categoryRepository.save(category);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Category created successfully',
        data: category
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(categoryQueryDto: CategoryQueryDto, paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = paginationQueryDto;
    const { name, order } = categoryQueryDto;

    try {
      const conditions: FindOptionsWhere<Category> | FindOptionsWhere<Category[]> = {
        ...(name ? { name: Like(`%${name}%`) } : {}),
        ...(order ? { order } : {}),
        ...({ status: Status.Active })
      }

      const categories = await this.categoryRepository.find({
        where: conditions,
        take: limit,
        skip: offset,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Categories retrieved successfully',
        data: categories
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const category = this.categoryRepository.findOneBy({ id });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Category retrieved successfully',
        data: category
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepository.findOneBy({ id });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      await this.categoryRepository.update(category.id, updateCategoryDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Category updated successfully',
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const category = await this.categoryRepository.findOneBy({ id });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      await this.categoryRepository.remove(category);

      return {
        statusCode: HttpStatus.OK,
        message: 'Category deleted successfully',
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
