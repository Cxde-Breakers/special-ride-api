import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBookingDto {
    @IsNotEmpty()
    pickupPoint: string;

    @IsNotEmpty()
    dropoffPoint: string;

    @IsNotEmpty()
    @IsNumber()
    distance: number;

    @IsNotEmpty()
    @IsNumber()
    suggestedFare: number;

    @IsNotEmpty()
    @IsNumber()
    adminCommission: number;

    @IsNotEmpty()
    country: string;
}
