import { Module } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { PassengersController } from './passengers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passenger } from './entities/passenger.entity';
import { User } from '../entities/user.entity';
import { Country } from '../../countries/entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Passenger, User, Country])],
  controllers: [PassengersController],
  providers: [PassengersService],
})
export class PassengersModule { }
