import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminsService {
  constructor(
   @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
 ) {}

  async findAll() {
   try {
     const admins = await this.adminRepository.find({
       relations: ['country', 'user']
     });

     return {
       statusCode: HttpStatus.OK,
       message: 'Admins retrieved successfully',
       data: admins
     }
   } catch (error) {
     if (error instanceof NotFoundException) {
       throw new NotFoundException(error.message);
     }
     throw new BadRequestException(error.message);
   }
  }

  async findOne(id: string) {
   try {
     const admin = await this.adminRepository.findOne({
       where: {
         id
       },
       relations: ['country', 'user']
     });

     if (!admin) {
       throw new NotFoundException('Admin not found');
     }

     return {
       statusCode: HttpStatus.OK,
       message: 'Admin retrieved successfully',
       data: admin
     }
   } catch (error) {
     if (error instanceof NotFoundException) {
       throw new NotFoundException(error.message);
     }
     throw new BadRequestException(error.message);
   }
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    try {
      const admin = await this.adminRepository.findOne({
        where: {
          id
        },
        relations: ['country']
      });

      if (!admin) {
        throw new NotFoundException('Admin not found');
      }

      await this.adminRepository.update(admin.id, {
        ...updateAdminDto,
        country: {
          id: updateAdminDto.country ? updateAdminDto.country : admin.country.id
        },
        profilePicture: updateAdminDto.profilePicture ? updateAdminDto.profilePicture : admin.profilePicture,
        status: updateAdminDto.status ? updateAdminDto.status : admin.status
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Admin updated successfully'
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
      const admin = await this.adminRepository.findOneBy({ id });

      if (!admin) {
        throw new NotFoundException('Admin not found');
      }

      await this.adminRepository.remove(admin);

      return {
        statusCode: HttpStatus.OK,
        message: 'Admin deleted successfully'
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
