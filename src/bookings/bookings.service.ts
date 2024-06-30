import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { Between, FindOptionsWhere, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/shared/enums/status.enum';
import { BookingQueryDto } from './dto/booking-query.dto';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { ActiveUserData } from 'src/iam/interfaces/active-user.interface';
import { Role } from 'src/users/enums/role.enum';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    try {
      const booking = this.bookingRepository.create({
        ...createBookingDto
      });

      await this.bookingRepository.save(booking);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Booking created successfully',
        data: booking
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(BookingQueryDto: BookingQueryDto, paginationQueryDto: PaginationQueryDto, activeUser: ActiveUserData) {
    const { limit, offset } = paginationQueryDto;
    const { pickupPoint, dropoffPoint, suggestedFareMin, suggestedFareMax, distanceMin, distanceMax, adminCommissionMin, adminCommissionMax, country } = BookingQueryDto;

    try {
      const conditions: FindOptionsWhere<Booking> | FindOptionsWhere<Booking[]> = {
        ...(pickupPoint ? { pickupPoint: Like(`%${pickupPoint}%`) } : {}),
        ...(dropoffPoint ? { dropoffPoint: Like(`%${dropoffPoint}%`) } : {}),
        ...(suggestedFareMin && suggestedFareMax ? { suggestedFare: Between(suggestedFareMin, suggestedFareMax) } : {}),
        ...(distanceMin && distanceMax ? { distance: Between(distanceMin, distanceMax) } : {}),
        ...(adminCommissionMin && adminCommissionMax ? { adminCommission: Between(adminCommissionMin, adminCommissionMax) } : {}),
        ...(country ? { country: Like('%${country}%') } : {}),
        ...(activeUser.role === Role.Driver ? { driver: { id: activeUser.sub } } : {}),
        ...(activeUser.role === Role.Passenger ? { passenger: { id: activeUser.sub } } : {}),
        ...({status: Status.Active}),
      }

      const bookings = await this.bookingRepository.find({
        where: conditions,
        take: limit,
        skip: offset,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Bookings retrieved successfully',
        data: bookings
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
   try {
     const booking = await this.bookingRepository.findOneBy({ id });

     if (!booking) {
       throw new NotFoundException(`Booking not found`);
     }

     return {
        statusCode: HttpStatus.OK,
        message: 'Booking retrieved successfully',
        data: booking
     }
   } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
   }
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    try {
      const booking = await this.bookingRepository.findOneBy({ id });
      
      if (!booking) {
        throw new NotFoundException('Booking not found');
      }

      await this.bookingRepository.update(booking.id, {
        ...updateBookingDto
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Booking updated successfully',
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
      const booking = await this.bookingRepository.findOneBy({ id });

      if (!booking) {
        throw new NotFoundException('Booking not found');
      }

      await this.bookingRepository.update(booking.id, {
        status: Status.Inactive
      });

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
