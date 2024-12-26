import { Body, Controller, Post, HttpCode, HttpStatus, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { SignInDto } from './dto/sign-in.dto';
import { CheckExistsDto } from './dto/check-exists.dto';
import { ExistByPhoneResponse } from 'src/common/responses/exist-by-phone.response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User registered successfully',
        type: SignUpResponseDto
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')
    signUp(@Body() signUpDto: SignUpDto): Promise<SignUpResponseDto> {
        return this.authService.signUp(signUpDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }

    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Check if user exists',
        type: ExistByPhoneResponse
    })
    @Post('exists')
    checkExists(@Body() checkExistsDto: CheckExistsDto): Promise<ExistByPhoneResponse> {
        return this.authService.checkExists(checkExistsDto);
    }
}