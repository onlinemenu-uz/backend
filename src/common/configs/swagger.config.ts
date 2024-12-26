import * as NestConfig from '@nestjs/config';

export const SwaggerConfig = NestConfig.registerAs('swagger', () => ({
    title: process.env.SWAGGER_TITLE || 'api.onlinemenu.uz API Documentation',
    description: process.env.SWAGGER_DESCRIPTION || 'The API documentation',
    version: process.env.SWAGGER_VERSION || '0.0.1',
    urlCustomer: process.env.SWAGGER_URL_CUSTOMER || 'customer/api-docs',
    urlAdmin: process.env.SWAGGER_URL_ADMIN || 'admin/api-docs',
    urlBranch: process.env.SWAGGER_URL_BRANCH || 'branch/api-docs',
}));