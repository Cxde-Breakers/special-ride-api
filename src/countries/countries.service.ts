import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Repository } from 'typeorm';
import { Status } from 'src/shared/enums/status.enum';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country) private readonly countryRepository: Repository<Country>,
  ) { }

  async create(createCountryDto: CreateCountryDto) {
    try {
      const country = this.countryRepository.create({
        ...createCountryDto
      });

      await this.countryRepository.save(country);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Country was created successfully',
        data: country
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const countries = await this.countryRepository.find();

      return {
        statusCode: HttpStatus.OK,
        message: 'Countries were retrieved successfully',
        data: countries
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const country = await this.countryRepository.findOneBy({ id });

      if (!country) {
        throw new NotFoundException(`Country not found`);
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Country retrieved successfully',
        data: country
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message)
    }
  }

  async update(id: string, updateCountryDto: UpdateCountryDto) {
    try {
      const country = await this.countryRepository.findOneBy({ id });

      if (!country) {
        throw new NotFoundException('Country not found');
      }

      await this.countryRepository.update(country.id, {
        ...updateCountryDto
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Country was updated successfully',
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
      const country = await this.countryRepository.findOneBy({ id });

      if (!country) {
        throw new NotFoundException('Country not found');
      }

      await this.countryRepository.update(country.id, {
        status: Status.Inactive
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Country was updated successfully',
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
