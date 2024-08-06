import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePassengerDto } from './create-passenger.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { Status } from 'src/shared/enums/status.enum';

export class UpdatePassengerDto extends PartialType(CreatePassengerDto) {
    @ApiProperty()
    @IsOptional()
    @IsEnum(Status)
    status: Status;
}
