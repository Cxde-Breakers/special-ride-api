import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateSubcategoryDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    category: string;

    @ApiProperty()
    @IsNotEmpty()
    order: number;

    @ApiProperty({ type: 'binary', format: 'string' })
    image: string;
}