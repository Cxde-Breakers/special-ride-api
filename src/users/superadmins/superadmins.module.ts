import { Module } from '@nestjs/common';
import { SuperadminsService } from './superadmins.service';
import { SuperadminsController } from './superadmins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Superadmin } from './entities/superadmin.entity';
import { Country } from 'src/countries/entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Superadmin, Country])],
  controllers: [SuperadminsController],
  providers: [SuperadminsService],
})
export class SuperadminsModule {}
