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
    latitude: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    longitude: number;

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

    @ApiProperty()
    @IsNotEmpty()
    idFront: string;

    @ApiProperty()
    @IsNotEmpty()
    idBack: string;

    @ApiProperty()
    @IsNotEmpty()
    vehiclePhoto: string;

    @ApiProperty()
    @IsNotEmpty()
    vehicleRegistrationPhotoFront: string;

    @ApiProperty()
    @IsNotEmpty()
    vehicleRegistrationPhotoBack: string;

    @ApiProperty()
    @IsNotEmpty()
    driversLicensePhotoFront: string;

    @ApiProperty()
    @IsNotEmpty()
    driversLicensePhotoBack: string;
}

