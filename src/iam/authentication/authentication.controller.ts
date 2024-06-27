import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ActiveUser } from '../decorators/active-user.decorator';
import { ActiveUserData } from '../interfaces/active-user.interface';
import { OtpAuthenticationService } from './otp-authentication.service';
import { Response } from 'express';
import { toFileStream } from 'qrcode';
import { CreatePassengerDto } from 'src/users/passengers/dto/create-passenger.dto';
import { CreateDriverDto } from 'src/users/drivers/dto/create-driver.dto';
import { OtpDto } from './dto/otp.dto';
import { OtpSmsAuthenticationService } from './otp-sms-authentication.service';

@Auth(AuthType.None)
@Controller('auth')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService,
        private readonly otpAuthenticationService: OtpAuthenticationService,
        private readonly otpSmsAuthenticationService: OtpSmsAuthenticationService,
    ) { }

    @Post('sign-up')
    signUp(@Body() signUpDto: SignUpDto, createUserTypeDto: CreatePassengerDto | CreateDriverDto) {
        return this.authenticationService.signUp(signUpDto, createUserTypeDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('sign-in')
    signIn(@Body() signInDto: SignInDto) {
        return this.authenticationService.signIn(signInDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('refresh-tokens')
    refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authenticationService.refreshTokens(refreshTokenDto);
    }

    @Auth(AuthType.Bearer)
    @HttpCode(HttpStatus.OK)
    @Post('2fa/generate')
    async generateQrCode(
        @ActiveUser() activeUser: ActiveUserData,
        @Res() response: Response,
    ) { 
        const { secret, uri } = await this.otpAuthenticationService.generateSecret(activeUser.email);

        await this.otpAuthenticationService.enableTfaForUser(activeUser.email, secret);

        response.type('png');

        return toFileStream(response, uri);
    }

    @HttpCode(HttpStatus.OK)
    @Post('otp')
    async generateOtp(@Body() otpDto: OtpDto) {
        return this.otpSmsAuthenticationService.sendVerificationCode(otpDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('verify-otp')
    async verifyOtp(@Body() otpDto: OtpDto) {
        return this.otpSmsAuthenticationService.verifyCode(otpDto);
    }
}
