import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { Gender } from "src/users/enums/gender.enum";

export class CreatePassengerDto {
    @ApiProperty()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    country: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    age: number;

    @ApiProperty({ type: 'string', format: 'binary' })
    idFront: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    idBack: string;

    @ApiProperty({ enum: Gender })
    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender;

    @ApiProperty({ type: 'string', format: 'binary' })
    profilePicture: string;
}
