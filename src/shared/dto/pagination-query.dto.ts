import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class PaginationQueryDto {
     @ApiProperty({required: false})
    @IsOptional()
    @IsNumber()
    limit: number;
    
     @ApiProperty({required: false})
    @IsOptional()
    @IsNumber()
    offset: number;
}