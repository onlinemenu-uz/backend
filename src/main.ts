import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SuccessResponseInterceptor } from './common/interceptors';
import { ExceptionsFilter } from './common/filters';
import { ClassValidationPipe } from './common/pipes';
import { ConfigService, ConfigType } from '@nestjs/config';
import { ServerConfig } from './common/configs';
import { setupSwagger } from './common/utils/setup-swagger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  const configService = app.get(ConfigService)
  const serverConfig = configService.getOrThrow<ConfigType<typeof ServerConfig>>('server')
  app.useGlobalInterceptors(new SuccessResponseInterceptor())
  // app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new ExceptionsFilter())
  app.useGlobalPipes(new ClassValidationPipe())

  app.setGlobalPrefix('/v1/api')
  setupSwagger(app)

  await app.listen(serverConfig.port, serverConfig.host, async () => {
    console.log(await app.getUrl());
  });
}
bootstrap();
