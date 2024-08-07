import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { Status } from '../../shared/enums/status.enum';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @ApiProperty({ enum: Status })
    @IsOptional()
    @IsEnum(Status)
    status: Status;
}
