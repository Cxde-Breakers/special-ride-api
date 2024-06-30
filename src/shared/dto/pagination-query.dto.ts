import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class PaginationQueryDto {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    limit: number;
    
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    offset: number;
}