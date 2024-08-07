import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Driver } from 'src/users/drivers/entities/driver.entity';
import { Passenger } from 'src/users/passengers/entities/passenger.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Booking, Driver, Passenger])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule { }
