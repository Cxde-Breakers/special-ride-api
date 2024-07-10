import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver) private readonly driverRepository: Repository<Driver>,
  ) { }

  async findAll() {
    try {
      const drivers = await this.driverRepository.find({
        relations: ['country', 'bookings', 'category', 'subcategory', 'user']
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
        relations: ['country', 'bookings', 'category', 'subcategory', 'user']
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
        },
        profilePicture: updateDriverDto.profilePicture ? updateDriverDto.profilePicture : driver.profilePicture,
        idFront: updateDriverDto.idFront ? updateDriverDto.idFront : driver.idFront,
        idBack: updateDriverDto.idBack ? updateDriverDto.idBack : driver.idBack,
        vehiclePhoto: updateDriverDto.vehiclePhoto ? updateDriverDto.vehiclePhoto : driver.vehiclePhoto,
        vehicleRegistrationPhotoFront: updateDriverDto.vehicleRegistrationPhotoFront ? updateDriverDto.vehicleRegistrationPhotoFront : driver.vehicleRegistrationPhotoFront,
        vehicleRegistrationPhotoBack: updateDriverDto.vehicleRegistrationPhotoBack ? updateDriverDto.vehicleRegistrationPhotoBack : driver.vehicleRegistrationPhotoBack,
        driversLicensePhotoFront: updateDriverDto.driversLicensePhotoFront ? updateDriverDto.driversLicensePhotoFront : driver.driversLicensePhotoFront,
        driversLicensePhotoBack: updateDriverDto.driversLicensePhotoBack ? updateDriverDto.driversLicensePhotoBack : driver.driversLicensePhotoBack,
      });

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
