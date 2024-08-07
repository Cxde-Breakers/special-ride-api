import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSuperadminDto } from './dto/create-superadmin.dto';
import { UpdateSuperadminDto } from './dto/update-superadmin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Superadmin } from './entities/superadmin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SuperadminsService {
  constructor(
    @InjectRepository(Superadmin) private readonly superAdminRepository: Repository<Superadmin>,
  ) { }
  
  async findAll() {
    try {
      const superadmins = await this.superAdminRepository.find();

      return {
        statusCode: HttpStatus.OK,
        message: "Superadmin retrieved successfully",
        data: superadmins,
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const superadmin = await this.superAdminRepository.findOneBy({ id });

      if (!superadmin) {
        throw new NotFoundException('Superadmin not found');
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Superadmin retrieved successfully',
        data: superadmin,
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateSuperadminDto: UpdateSuperadminDto) {
    try {
      const superadmin = await this.superAdminRepository.findOneBy({ id });

      if (!superadmin) {
        throw new NotFoundException('Superadmin not found');
      }

      await this.superAdminRepository.update(id, {
        ...updateSuperadminDto,
        profilePicture: updateSuperadminDto.profilePicture ? updateSuperadminDto.profilePicture : superadmin.profilePicture,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Superadmin updated successfully',
        data: superadmin,
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
