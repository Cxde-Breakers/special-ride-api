import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectRepository(Subcategory) private readonly subcategoryRepository: Repository<Subcategory>,
  ) { }

  async create(createSubcategoryDto: CreateSubcategoryDto) {
    try {
      const subcategory = this.subcategoryRepository.create({
        ...createSubcategoryDto,
        category: {
          id: createSubcategoryDto.category
        }
      });

      await this.subcategoryRepository.save(subcategory);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Subcategory created successfully',
        data: subcategory
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const subcategories = await this.subcategoryRepository.find();

      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Subcategories retrieved successfully',
        data: subcategories
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const subcategory = await this.subcategoryRepository.findOneBy({ id });

      if (!subcategory) {
        throw new NotFoundException('Subcategory not found');
      }

      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Subcategory retrieved successfully',
        data: subcategory
      }

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateSubcategoryDto: UpdateSubcategoryDto) {
    try {
      const subcategory = await this.subcategoryRepository.findOneBy({ id });

      if (!subcategory) {
        throw new NotFoundException('Subcategory not found');
      }

      await this.subcategoryRepository.update(subcategory.id, {
        ...updateSubcategoryDto,
        category: {
          id: updateSubcategoryDto.category
        } 
      });

      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Subcategory updated successfully',
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
      const subcategory = await this.subcategoryRepository.findOneBy({ id });

      if (!subcategory) {
        throw new NotFoundException('Subcategory not found');
      }

      await this.subcategoryRepository.update(subcategory.id, {
        status: !subcategory.status
      });

      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Subcategory disabled successfully',
      }

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
