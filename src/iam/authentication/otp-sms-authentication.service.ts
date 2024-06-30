import { Passenger } from './../../users/passengers/entities/passenger.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { OtpDto } from './dto/otp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Passenger } from 'src/users/passengers/entities/passenger.entity';
import { Driver } from 'src/users/drivers/entities/driver.entity';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class OtpSmsAuthenticationService {
    private twilioClient: Twilio;

    constructor(
        private configService: ConfigService,
        private readonly authenticationService: AuthenticationService,
        @InjectRepository(Passenger) private readonly passengerRepository: Repository<Passenger>,
        @InjectRepository(Driver) private readonly driverRepository: Repository<Driver>,
    ) {
        this.twilioClient = new Twilio(
            this.configService.getOrThrow('TWILIO_ACCOUNT_SID'),
            this.configService.getOrThrow('TWILIO_AUTH_TOKEN')
        );
    }

    async sendVerificationCode(otpDto: OtpDto) {
        try {
            const passenger = await this.passengerRepository.findOneBy({ phoneNumber: otpDto.phoneNumber });
            const driver = await this.driverRepository.findOneBy({ phoneNumber: otpDto.phoneNumber });

            if (!passenger && !driver) {
                throw new BadRequestException('No user found with this phone number');
            }

            const serviceSid = this.configService.getOrThrow('TWILIO_ACCOUNT_SID');
            const verification = await this.twilioClient.verify.v2.services(serviceSid)
                .verifications
                .create({
                    to: otpDto.phoneNumber,
                    channel: 'sms',
                });

            return verification.sid;
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async verifyCode(otpDto: OtpDto) {
       try {
           const passenger = await this.passengerRepository.findOneBy({ phoneNumber: otpDto.phoneNumber });
           const driver = await this.driverRepository.findOneBy({ phoneNumber: otpDto.phoneNumber });

           if (!passenger && !driver) {
               throw new BadRequestException('No user found with this phone number');
           }

           const serviceSid = this.configService.getOrThrow('TWILIO_SERVICE_SID');
           const verificationCheck = await this.twilioClient.verify.v2.services(serviceSid)
               .verificationChecks
               .create({
                   to: otpDto.phoneNumber,
                   code: otpDto.code,
               });

           if (verificationCheck.status !== 'approved') {
                   throw new BadRequestException('Invalid verification code');
           }
       } catch (error) {
            throw new BadRequestException(error.message);
       }
    }
}
