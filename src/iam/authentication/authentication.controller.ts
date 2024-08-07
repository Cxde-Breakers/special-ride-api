import { Body, Controller, HttpCode, HttpStatus, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
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
import { OtpDto } from './dto/otp.dto';
import { OtpSmsAuthenticationService } from './otp-sms-authentication.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Role } from '../../users/enums/role.enum';

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
    signUp(@Body() signUpDto: SignUpDto, @Body() createUserTypeDto: any,
        @UploadedFiles() files: {
            profilePicture?: Express.Multer.File[],
            idFront?: Express.Multer.File[],
            idBack?: Express.Multer.File[],
            vehiclePhoto?: Express.Multer.File[],
            vehicleRegistrationPhotoFront?: Express.Multer.File[],
            vehicleRegistrationPhotoBack?: Express.Multer.File[],
            driversLicensePhotoFront?: Express.Multer.File[],
            driversLicensePhotoBack?: Express.Multer.File[]
        }) {

        if (files) {
            createUserTypeDto.profilePicture = files.profilePicture ? files.profilePicture[0].buffer.toString('base64') : 'null';

            if (signUpDto.role === Role.Passenger || signUpDto.role === Role.Driver) {
                createUserTypeDto.idFront = files.idFront ? files.idFront[0].buffer.toString('base64') : 'null';
                createUserTypeDto.idBack = files.idBack ? files.idBack[0].buffer.toString('base64') : 'null';
            }

            if (signUpDto.role === Role.Driver) {
                createUserTypeDto.vehiclePhoto = files.vehiclePhoto ? files.vehiclePhoto[0].buffer.toString('base64') : 'null';
                createUserTypeDto.vehicleRegistrationPhotoFront = files.vehicleRegistrationPhotoFront ? files.vehicleRegistrationPhotoFront[0].buffer.toString('base64') : 'null';
                createUserTypeDto.vehicleRegistrationPhotoBack = files.vehicleRegistrationPhotoBack ? files.driversLicensePhotoBack[0].buffer.toString('base64') : 'null';
                createUserTypeDto.driversLicensePhotoFront = files.driversLicensePhotoFront ? files.driversLicensePhotoFront[0].buffer.toString('base64') : 'null';
                createUserTypeDto.driversLicensePhotoBack = files.driversLicensePhotoBack ? files.driversLicensePhotoBack[0].buffer.toString('base64') : 'null';
            }
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
