import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber } from "class-validator";

export class SubCategoryQueryDto {
    @ApiProperty({ required: false })
    @IsOptional()
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    category: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    order: number;
}