import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,  } from "class-validator";

export class CreateSuperadminDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    profilePicture: string;
}
