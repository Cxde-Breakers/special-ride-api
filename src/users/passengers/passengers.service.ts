import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Passenger } from './entities/passenger.entity';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class PassengersService {
  constructor(
    @InjectRepository(Passenger) private readonly passengerRepository: Repository<Passenger>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async findAll() {
    try {
      const passengers = await this.passengerRepository.find({
        relations: ['bookings', 'country', 'user']
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Passengers retrieved successfully',
        data: passengers
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const passenger = await this.passengerRepository.findOne({
        where: {
          id
        },
        relations: ['bookings', 'country', 'user']
      });

      if (!passenger) {
        throw new NotFoundException('Passenger not found');
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Passenger retrieved successfully',
        data: passenger,
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updatePassengerDto: UpdatePassengerDto) {
    try {
      const passenger = await this.passengerRepository.findOne({ 
        where: {
          id
        },
        relations: ['country']
       });

      if (!passenger) {
        throw new NotFoundException('Passenger not found');
      }

      await this.passengerRepository.update(passenger.id, {
        ...updatePassengerDto,
        country: {
          id: updatePassengerDto.country ? updatePassengerDto.country : passenger.country.id
        },
        profilePicture: updatePassengerDto.profilePicture ? updatePassengerDto.profilePicture : passenger.profilePicture,
        idFront: updatePassengerDto.idFront ? updatePassengerDto.idFront : passenger.idFront,
        idBack: updatePassengerDto.idBack ? updatePassengerDto.idBack : passenger.idBack,
      });

      if (updatePassengerDto.status) {
        await this.userRepository.update(passenger.user.id, {
          status: updatePassengerDto.status
        });
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Passenger updated successfully',
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
      const passenger = await this.passengerRepository.findOneBy({ id });

      if (!passenger) {
        throw new NotFoundException('Passenger not found');
      }

      await this.passengerRepository.remove(passenger);

      return {
        statusCode: HttpStatus.OK,
        message: 'Passenger deleted successfully'
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
