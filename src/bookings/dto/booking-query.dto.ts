import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber } from "class-validator";

export class BookingQueryDto {
    @ApiProperty({required: false})
    @IsOptional()
    pickupPoint: string;

     @ApiProperty({required: false})
    @IsOptional()
    dropoffPoint: string;

     @ApiProperty({required: false})
    @IsOptional()
    @IsNumber()
    distanceMin: number;

     @ApiProperty({required: false})
    @IsOptional()
    @IsNumber()
    distanceMax: number;

     @ApiProperty({required: false})
    @IsOptional()
    @IsNumber()
    suggestedFareMin: number;

     @ApiProperty({required: false})
    @IsOptional()
    @IsNumber()
    suggestedFareMax: number;

     @ApiProperty({required: false})
    @IsOptional()
    @IsNumber()
    adminCommissionMin: number;

     @ApiProperty({required: false})
    @IsOptional()
    @IsNumber()
    adminCommissionMax: number;

     @ApiProperty({required: false})
    @IsOptional()
    country: string;
}
