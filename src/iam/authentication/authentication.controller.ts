import { Body, Controller, HttpCode, HttpStatus, Post, Res, UseInterceptors } from '@nestjs/common';
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
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateAdminDto } from 'src/users/admins/dto/create-admin.dto';
import { CreateSuperadminDto } from 'src/users/superadmins/dto/create-superadmin.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Auth(AuthType.None)
@Controller('auth')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService,
        private readonly otpAuthenticationService: OtpAuthenticationService,
        private readonly otpSmsAuthenticationService: OtpSmsAuthenticationService,
    ) { }

    @Post('sign-up')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'profilePicture', maxCount: 1 },
        { name: 'idFront', maxCount: 1 },
        { name: 'idBack', maxCount: 1 },
        { name: 'vehiclePhoto', maxCount: 1 },
        { name: 'vehicleRegistrationPhotoFront', maxCount: 1 },
        { name: 'vehicleRegistrationPhotoBack', maxCount: 1 },
        { name: 'driversLicensePhotoFront', maxCount: 1 },
        { name: 'driversLicensePhotoBack', maxCount: 1 },
    ]))
    signUp(@Body() signUpDto: SignUpDto, createUserTypeDto: CreatePassengerDto | CreateDriverDto | CreateAdminDto | CreateSuperadminDto, files: { profilePicture?: Express.Multer.File[], idFront?: Express.Multer.File[], idBack?: Express.Multer.File[], vehiclePhoto?: Express.Multer.File[], vehicleRegistrationPhotoFront?: Express.Multer.File[], vehicleRegistrationPhotoBack?: Express.Multer.File[], driversLicensePhotoFront?: Express.Multer.File[], driversLicensePhotoBack?: Express.Multer.File[] }) {
        createUserTypeDto.profilePicture = files.profilePicture && files.profilePicture[0].buffer.toString('base64');

        if (createUserTypeDto instanceof CreatePassengerDto || createUserTypeDto instanceof CreateDriverDto ) {
            createUserTypeDto.idFront = files.idFront && files.idFront[0].buffer.toString('base64');
            createUserTypeDto.idBack = files.idBack && files.idBack[0].buffer.toString('base64');
        }

        if (createUserTypeDto instanceof CreateDriverDto) {
            createUserTypeDto.vehiclePhoto = files.vehiclePhoto && files.vehiclePhoto[0].buffer.toString('base64');
            createUserTypeDto.vehicleRegistrationPhotoFront = files.driversLicensePhotoFront && files.driversLicensePhotoFront[0].buffer.toString('base64');
            createUserTypeDto.driversLicensePhotoFront = files.driversLicensePhotoFront && files.driversLicensePhotoFront[0].buffer.toString('base64');
            createUserTypeDto.driversLicensePhotoBack = files.driversLicensePhotoBack && files.driversLicensePhotoBack[0].buffer.toString('base64');
        }

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

    @ApiBearerAuth()
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
