import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { Gender } from "src/users/enums/gender.enum";

export class CreateDriverDto {
    @ApiProperty()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    @IsNotEmpty()
    registrationNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    plateNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    country: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    age: number;

    @ApiProperty({ enum: Gender })
    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender;

    @ApiProperty()
    @IsNotEmpty()
    vehicle: string;

    @ApiProperty()
    @IsNotEmpty()
    color: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    @IsNotEmpty()
    idFront: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    @IsNotEmpty()
    idBack: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    @IsNotEmpty()
    vehiclePhoto: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    @IsNotEmpty()
    vehicleRegistrationPhotoFront: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    vehicleRegistrationPhotoBack: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    driversLicensePhotoFront: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    driversLicensePhotoBack: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    profilePicture: string;
}

