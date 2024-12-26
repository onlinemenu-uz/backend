import { ApiProperty } from "@nestjs/swagger";

export class SignUpResponseDto {
    @ApiProperty({
        example: '3600',
        required: true
    })
    ttl: number;

    @ApiProperty({
        example: '+998901234567',
        required: true
    })
    phone: string;
}