import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Status } from 'src/shared/enums/status.enum';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
    @ApiProperty()
    @IsOptional()
    @IsEnum(Status)
    status: Status;
}
