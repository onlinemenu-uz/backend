import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
    @ApiProperty({
        example: 'Jt670khL8!X=B#',
        required: true
    })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    password: string;

    @ApiProperty({
        example: '+998901234567',
        required: true
    })
    @IsPhoneNumber('UZ')
    phone: string;
}