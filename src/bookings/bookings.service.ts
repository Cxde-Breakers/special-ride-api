import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/shared/enums/status.enum';

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

  async findAll() {
    try {
      const bookings = await this.bookingRepository.find();

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
