import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class OtpDto {
    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    code?: string;
}