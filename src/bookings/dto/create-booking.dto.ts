import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBookingDto {
    @ApiProperty()
    @IsNotEmpty()
    pickupPoint: string;

    @ApiProperty()
    @IsNotEmpty()
    dropoffPoint: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    distance: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    suggestedFare: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    adminCommission: number;

    @ApiProperty()
    @IsNotEmpty()
    country: string;
}
