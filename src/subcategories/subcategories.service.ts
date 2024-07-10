import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { SubCategoryQueryDto } from './dto/subcategory-query.dto';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { Status } from 'src/shared/enums/status.enum';

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

  async findAll(subcategoryQueryDto: SubCategoryQueryDto, paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = paginationQueryDto;
    const { name, category, order } = subcategoryQueryDto;

    try {
      const conditions: FindOptionsWhere<Subcategory> | FindOptionsWhere<Subcategory[]> = {
        ...(name ? { name: Like(`%${name}%`) } : {}),
        ...(category ? { category: { id: category } } : {}),
        ...(order ? { order } : {}),
      }

      const subcategories = await this.subcategoryRepository.find({
        where: conditions,
        take: limit,
        skip: offset,
        relations: ['category']
      });

      return {
        statusCode: HttpStatus.OK,
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
        statusCode: HttpStatus.OK,
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
    console.log(id)
    try {
      const subcategory = await this.subcategoryRepository.findOneBy({ id });

      if (!subcategory) {
        throw new NotFoundException('Subcategory not found');
      }

      await this.subcategoryRepository.update(subcategory.id, {
        ...updateSubcategoryDto,
        category: {
          id: updateSubcategoryDto.category ? updateSubcategoryDto.category : subcategory.category.id
        }
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Subcategory updated successfully',
      }
    } catch (error) {
      console.log(error);
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

      await this.subcategoryRepository.remove(subcategory);

      return {
        statusCode: HttpStatus.OK,
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
