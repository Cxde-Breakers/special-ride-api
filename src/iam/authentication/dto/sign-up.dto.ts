import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Min, MinLength } from "class-validator";
import { Role } from "src/users/enums/role.enum";

export class SignUpDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @MinLength(8)
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    role: Role;
}
