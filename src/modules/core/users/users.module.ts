
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities';
import { UserBranch } from 'src/database/entities/user-branch';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserBranch])],
  providers: [UserRepository, UsersService],
  exports: [UserRepository],
})
export class UsersModule { }
