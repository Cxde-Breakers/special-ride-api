import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './authentication/guards/access-token.guard';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { RefreshTokenIdsStorage } from './authentication/refresh-token-ids.storage';
import { RolesGuard } from './authorization/guards/roles.guard';
import { OtpAuthenticationService } from './authentication/otp-authentication.service';
import { Passenger } from 'src/users/passengers/entities/passenger.entity';
import { Driver } from 'src/users/drivers/entities/driver.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Booking } from 'src/bookings/entities/booking.entity';
import { OtpSmsAuthenticationService } from './authentication/otp-sms-authentication.service';
import { Admin } from 'src/users/admins/entities/admin.entity';
import { Superadmin } from 'src/users/superadmins/entities/superadmin.entity';
import { Country } from 'src/countries/entities/country.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Passenger, Driver, Transaction, Booking, Admin, Superadmin, Country]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    {
    provide: HashingService,
    useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AccessTokenGuard,
    RefreshTokenIdsStorage,
    AuthenticationService,
    OtpAuthenticationService,
    OtpSmsAuthenticationService,
  ],
  controllers: [AuthenticationController],
})
export class IamModule { }
