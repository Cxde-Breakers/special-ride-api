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
    @IsNumber()
    commissionForDriver: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    commissionFromDriverPercentage: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    commission: number;

    @ApiProperty()
    @IsNotEmpty()
    paystack: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    localEarnings: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
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
    @IsNumber()
    driverCreditLimit: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    maxDriverRadius: number;

    @ApiProperty()
    @IsNotEmpty()
    cashPaymentDirection: string;
}
