import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber } from "class-validator";

export class FindBookingDto {
    @ApiProperty()
    @IsOptional()
    pickupPoint: string;

    @ApiProperty()
    @IsOptional()
    dropoffPoint: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    distanceMin: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    distanceMax: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    suggestedFareMin: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    suggestedFareMax: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    adminCommissionMin: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    adminCommissionMax: number;

    @ApiProperty()
    @IsOptional()
    country: string;
}
