import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber } from "class-validator";

export class CreateCountryDto {
    @IsNotEmpty()
    name: string;

   @IsNotEmpty()
    iso: string;

    @IsNotEmpty()
    @IsNumber()
    commissionForDriver: number;

    @IsNotEmpty()
    @IsNumber()
    commissionFromDriverPercentage: number;

    @IsNotEmpty()
    @IsNumber()
    commission: number;

    @IsNotEmpty()
    paystack: string;

    @IsNotEmpty()
    @IsNumber()
    localEarnings: number;

    @IsNotEmpty()
    @IsNumber()
    usdEarnings: number;

    @IsPhoneNumber()
    ambulanceNumber: string;

   @IsPhoneNumber()
    policeNumber: string;

   @IsPhoneNumber()
    managerNumber: string;

   @IsEmail()
    supportMail: string;

    @IsNotEmpty()
    @IsNumber()
    driverCreditLimit: number;

    @IsNotEmpty()
    @IsNumber()
    maxDriverRadius: number;

    @IsNotEmpty()
    cashPaymentDirection: string;
}
