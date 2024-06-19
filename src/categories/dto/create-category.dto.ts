import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    order: number;

    @IsNotEmpty()
    image: string;
}