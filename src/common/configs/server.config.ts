import * as NestConfig from '@nestjs/config';

export const ServerConfig = NestConfig.registerAs('server', () => ({
  host: process.env.APP_HOST,
  port: process.env.APP_PORT,
  name: process.env.APP_NAME,
  url: process.env.APP_URL,
  swaggerRoute: process.env.SWAGGER_URL || '/api-docs',
}));