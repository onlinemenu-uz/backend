import { ApiProperty } from "@nestjs/swagger";

export class ExistByPhoneResponse {
    @ApiProperty({
        example: true,
        required: true
    })
    exists: boolean;
} 