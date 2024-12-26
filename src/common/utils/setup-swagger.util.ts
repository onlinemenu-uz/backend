import { Request, Response } from 'express'
import type { INestApplication } from "@nestjs/common";
import { ConfigService, ConfigType } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SwaggerConfig } from "../configs/swagger.config";

export function setupSwagger(app: INestApplication): void {
    const config = app.get(ConfigService)
    const swagger = config.get<ConfigType<typeof SwaggerConfig>>('swagger')

    const options = new DocumentBuilder()
        .setTitle(swagger.title)
        .setDescription("The API description")
        .setVersion(swagger.version)
        .addBearerAuth()
        .setContact(
            "Adrian Pietrzak",
            "https://pietrzakadrian.com",
            "contact@pietrzakadrian.com",
        )
        .setLicense(
            "MIT License",
            "https://opensource.org/licenses/MIT",
        )
        .addServer("http://localhost:3000")
        .addGlobalParameters({
            in: 'header',
            required: false,
            name: 'x-lang',
            schema: {
                example: 'en',
            },
        })
        .build();

    const document = SwaggerModule.createDocument(app, options)
    app.use('/api-docs-json/', (req: Request, res: Response) => res.send(document))

    SwaggerModule.setup(swagger?.urlCustomer, app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
        customSiteTitle: swagger.title,
        customCss: '.swagger-container .swagger-ui { max-width: 900px; margin: 0 auto; }',
    })
}