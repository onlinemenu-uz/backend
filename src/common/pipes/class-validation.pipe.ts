import { HttpStatus, UnprocessableEntityException, ValidationPipe } from "@nestjs/common";
import { ValidationError } from 'class-validator';

export class ClassValidationPipe extends ValidationPipe {
    exceptionFactory = (errors: ValidationError[]) => {
        const formattedErrors = errors.reduce((acc, { property, constraints }) => {
            acc[property] = Object.values(constraints);
            return acc;
        }, {});

        return new UnprocessableEntityException({
            status_code: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: formattedErrors,
            created_at: new Date().toISOString(),
        });
    };
}
