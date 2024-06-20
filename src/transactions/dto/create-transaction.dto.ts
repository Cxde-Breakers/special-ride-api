import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTransactionDto {
    @ApiProperty()
    @IsNotEmpty()
    paymentMethod: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amountPaid: number;

    @ApiProperty()
    @IsNotEmpty()
    country: string;

    @ApiProperty()
    @IsNotEmpty()
    paymentBy: string;
}
