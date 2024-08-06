import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDriverDto } from './create-driver.dto';
import { Status } from 'src/shared/enums/status.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateDriverDto extends PartialType(CreateDriverDto) {
    @ApiProperty()
    @IsOptional()
    @IsEnum(Status)
    status: Status;
}
