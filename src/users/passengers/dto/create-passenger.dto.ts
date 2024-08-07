import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";
import { Gender } from "src/users/enums/gender.enum";


export class CreatePassengerDto {
    @ApiProperty()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    // @IsNotEmpty()
    @IsOptional()
    country: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber: string;

    @ApiProperty()
    // @IsNotEmpty()
    @IsOptional()
    age: number;

    @ApiProperty({ type: 'string', format: 'binary' })
    @IsOptional()
    idFront: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    @IsOptional()
    idBack: string;

    @ApiProperty({ enum: Gender })
    // @IsNotEmpty()
    @IsOptional()
    @IsEnum(Gender)
    gender: Gender;

    @ApiProperty({ type: 'string', format: 'binary' })
    @IsOptional()
    profilePicture: string;
}
