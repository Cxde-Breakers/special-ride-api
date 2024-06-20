import { IsNotEmpty, IsNumber } from "class-validator";
import { Gender } from "src/users/enums/gender.enum";

export class CreateDriverDto {
    @IsNotEmpty()
    registrationNumber: string;

    @IsNotEmpty()
    plateNumber: string;

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    @IsNumber()
    latitude: number;

    @IsNotEmpty()
    @IsNumber()
    longitude: number;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    gender: Gender;

    @IsNotEmpty() 
    vehicle: string;

    @IsNotEmpty()
    color: string;

    @IsNotEmpty()
    idFront: string;

    @IsNotEmpty()
    idBack: string;

    @IsNotEmpty()
    vehiclePhoto: string;

    @IsNotEmpty()
    vehicleRegistrationPhotoFront: string;

    @IsNotEmpty()
    vehicleRegistrationPhotoBack: string;

    @IsNotEmpty()
    driversLicensePhotoFront: string;

    @IsNotEmpty()
    driversLicensePhotoBack: string;
}

