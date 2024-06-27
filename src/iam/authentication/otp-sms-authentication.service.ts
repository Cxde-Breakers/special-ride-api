import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { OtpDto } from './dto/otp.dto';

@Injectable()
export class OtpSmsAuthenticationService {
    private twilioClient: Twilio;

    constructor(private configService: ConfigService) {
        this.twilioClient = new Twilio(
            this.configService.getOrThrow('TWILIO_ACCOUNT_SID'),
            this.configService.getOrThrow('TWILIO_AUTH_TOKEN')
        );
    }

    async sendVerificationCode(otpDto: OtpDto): Promise<string> {
        const serviceSid = this.configService.getOrThrow('TWILIO_SERVICE_SID');
        const verification = await this.twilioClient.verify.v2.services(serviceSid)
            .verifications
            .create({
                to: otpDto.phoneNumber,
                channel: 'sms',
            });

        return verification.sid;
    }

    async verifyCode(otpDto: OtpDto): Promise<boolean> {
        const serviceSid = this.configService.getOrThrow('TWILIO_SERVICE_SID');
        const verificationCheck = await this.twilioClient.verify.v2.services(serviceSid)
            .verificationChecks
            .create({
                to: otpDto.phoneNumber,
                code: otpDto.code,
            });

        return verificationCheck.status === 'approved';
    }
}
