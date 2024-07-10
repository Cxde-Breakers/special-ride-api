import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSubcategoryDto } from './create-subcategory.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { Status } from 'src/shared/enums/status.enum';

export class UpdateSubcategoryDto extends PartialType(CreateSubcategoryDto) {
    @ApiProperty({ enum: Status })
    @IsOptional()
    @IsEnum(Status)
    status: Status;
}
