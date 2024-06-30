import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber } from "class-validator";

export class TransactionQueryDto {
    @ApiProperty({ required: false })
    @IsOptional()
    paymentMethod: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    amountPaidMin: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    amountPaidMax: number;

    @ApiProperty({ required: false })
    @IsOptional()
    country: string;

    @ApiProperty({ required: false })
    @IsOptional()
    paymentBy: string
}