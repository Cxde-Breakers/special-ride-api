import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateSubcategoryDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    @IsNumber()
    order: number;
}