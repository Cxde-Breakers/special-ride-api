import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { InstanceChecker, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver) private readonly driverRepository: Repository<Driver>,
  ) { }

  async findAll() {
    try {
      const drivers = await this.driverRepository.find({
        relations: ['country', 'user', 'bookings', 'category', 'subcategory']
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Drivers retrieved successfully',
        data: drivers
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const driver = await this.driverRepository.findOne({
        where: {
          id
        },
        relations: ['country', 'user', 'bookings', 'category', 'subcategory']
      });

      if (!driver) {
        throw new NotFoundException('Driver not found');
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Driver retrieved successfully',
        data: driver
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {
    try {
      const driver = await this.driverRepository.findOneBy({ id });

      if (!driver) {
        throw new NotFoundException('Driver not found');
      }

      await this.driverRepository.update(driver.id, {
        ...updateDriverDto,
        country: {
          id: updateDriverDto.country ? updateDriverDto.country : driver.country.id
        }
      })

      return {
        statusCode: HttpStatus.OK,
        message: 'Driver updated successfully',
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
      const driver = await this.driverRepository.findOneBy({ id });

      if (!driver) {
        throw new NotFoundException('Driver not found');
      }

      await this.driverRepository.remove(driver);

      return {
        statusCode: HttpStatus.OK,
        message: 'Driver deleted successfully',
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
