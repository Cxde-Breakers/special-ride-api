import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { Booking } from 'src/bookings/entities/booking.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver, Booking, User])],
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}
