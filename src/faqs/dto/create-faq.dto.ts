import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateFaqDto {
    @IsNotEmpty()
    question: string;

    @IsNotEmpty()
    answer: string;

    @IsNotEmpty()
    @IsNumber()
    order: number;
}