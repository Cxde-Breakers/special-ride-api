import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { CountryPerKmCost } from './entities/country-per-km-cost.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country, CountryPerKmCost])],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
