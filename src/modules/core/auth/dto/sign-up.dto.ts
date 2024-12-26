import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
    @ApiProperty({
        example: 'John',
        required: true
    })
    @IsString()
    first_name: string;

    @ApiProperty({
        example: 'Doe',
        required: true
    })
    @IsString()
    sur_name: string;

    @ApiProperty({
        example: 'Smith',
        nullable: true,
        required: true
    })
    @IsOptional()
    @IsString()
    middle_name?: string;

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