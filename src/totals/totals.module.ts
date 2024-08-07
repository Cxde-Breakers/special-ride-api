import { Module } from '@nestjs/common';
import { TotalsService } from './totals.service';
import { TotalsController } from './totals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Country } from 'src/countries/entities/country.entity';
import { User } from 'src/users/entities/user.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Booking, Country, Transaction])],
  providers: [TotalsService],
  controllers: [TotalsController]
})
export class TotalsModule { }
