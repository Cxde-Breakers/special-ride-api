import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

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

  async findAll() {
    try {
      const categories = await this.categoryRepository.find();

      return {
        statusCode: HttpStatus.ACCEPTED,
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
        statusCode: HttpStatus.ACCEPTED,
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
        statusCode: HttpStatus.ACCEPTED,
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

      await this.categoryRepository.update(category.id, {
        status: !category.status
      });

      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Category disabled successfully',
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
