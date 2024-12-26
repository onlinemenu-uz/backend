import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Exists } from "src/common/decorators/validators";
import { User } from "src/database/entities";

export class SignInDto {
    @ApiProperty({
        example: '+998901234567',
        required: true
    })
    // @Exists(User, 'phone')
    @IsPhoneNumber('UZ')
    phone: string;

    @ApiProperty({
        example: 'Jt670khL8!X=B#',
        required: true
    })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    password: string;
}