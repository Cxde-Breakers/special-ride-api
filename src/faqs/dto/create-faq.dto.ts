import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateFaqDto {
    @ApiProperty()
    @IsNotEmpty()
    question: string;

    @ApiProperty()
    @IsNotEmpty()
    answer: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    order: number;
}