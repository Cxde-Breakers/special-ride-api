import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassengersModule } from './passengers/passengers.module';
import { DriversModule } from './drivers/drivers.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PassengersModule, DriversModule, AdminsModule],
})
export class UsersModule {}
