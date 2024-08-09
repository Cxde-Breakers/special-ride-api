import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber } from "class-validator";

export class CreateCountryDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    iso: string;

    @ApiProperty()
    @IsNotEmpty()
    commissionForDriver: number;

    @ApiProperty()
    @IsNotEmpty()
    commissionFromDriverPercentage: number;

    @ApiProperty()
    @IsNotEmpty()
    commission: number;

    @ApiProperty()
    @IsNotEmpty()
    paystack: string;

    @ApiProperty()
    @IsNotEmpty()
    localEarnings: number;

    @ApiProperty()
    @IsNotEmpty()
    usdEarnings: number;

    @ApiProperty()
    @IsPhoneNumber()
    ambulanceNumber: string;

    @ApiProperty()
    @IsPhoneNumber()
    policeNumber: string;

    @ApiProperty()
    @IsPhoneNumber()
    managerNumber: string;

    @ApiProperty()
    @IsEmail()
    supportMail: string;

    @ApiProperty()
    @IsNotEmpty()
    driverCreditLimit: number;

    @ApiProperty()
    @IsNotEmpty()
    maxDriverRadius: number;

    @ApiProperty()
    @IsNotEmpty()
    cashPaymentDirection: string;
}
