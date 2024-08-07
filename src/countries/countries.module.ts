import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { CountryPerKmCost } from './entities/country-per-km-cost.entity';
import { Admin } from 'src/users/admins/entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country, CountryPerKmCost, Admin])],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule { }
