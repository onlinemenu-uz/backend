import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber } from "class-validator";

export class CheckExistsDto {
    @ApiProperty({
        example: '+998901234567',
        required: true
    })
    @IsPhoneNumber('UZ')
    phone: string;
}