import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ModulesModule } from './modules/modules.module';
import { OtpModule } from './imp/otp/otp.module';
import { SmsModule } from './imp/sms/sms.module';
import { DatabseConfig, JwtConfig, ServerConfig, SmsConfig } from './common/configs';
import { TokenModule } from './imp/token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ServerConfig, DatabseConfig, SmsConfig, JwtConfig]
    }),
    DatabaseModule,
    ModulesModule,
    OtpModule,
    SmsModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
