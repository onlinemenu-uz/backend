import { ConflictException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserRepository } from '../users/user.repository';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UserRepository
  ) { }

  async signUp(signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    const user = await this.usersRepository.findOneBy({ phone: signUpDto.phone });
    if (user) {
      throw new ConflictException('User already exists');
    }
    const newUser = await this.usersRepository.create(signUpDto).save();
    return {
      phone: newUser.phone,
      ttl: 3600,
    }
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    // const user = await this.usersService.findOne(username);
    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    // const { password, ...result } = user;
    // // TODO: Generate a JWT and return it here
    // // instead of the user object
    // return result;
  }
}