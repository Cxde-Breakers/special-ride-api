import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateSuperadminDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    profilePicture: string;
    
    @ApiProperty()
    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    country: string;
}
