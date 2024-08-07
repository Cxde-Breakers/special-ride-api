import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDriverDto } from './create-driver.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { Status } from 'src/shared/enums/status.enum';

export class UpdateDriverDto extends PartialType(CreateDriverDto) {
    @ApiProperty()
    @IsOptional()
    @IsEnum(Status)
    status: Status;
}
