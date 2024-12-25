import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { RefreshTokenIdsStorage } from './refresh-token-ids.storage';
import { RedisModule } from 'src/database/redis/redis.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [RedisModule, JwtModule.register({})],
  providers: [TokenService, RefreshTokenIdsStorage],
  exports: [TokenService],
})
export class TokenModule { }
