import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { Booking } from 'src/bookings/entities/booking.entity';
import { User } from '../entities/user.entity';
import { Country } from 'src/countries/entities/country.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver, Booking, User, Country, Category, Subcategory])],
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}
