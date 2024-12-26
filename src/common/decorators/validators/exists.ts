import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from "class-validator";
import { DataSource, EntityPropertyNotFoundError, EntityTarget } from "typeorm";

@ValidatorConstraint({ name: 'Exists', async: true })
@Injectable()
export class ExistsConstraint implements ValidatorConstraintInterface {
    constructor(private dataSource: DataSource) {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        try {
            const model = validationArguments.constraints[0];
            const field = validationArguments.constraints[1];
      
            const repository = this.dataSource.getRepository(model);
            const isExist = await repository.findOne({
                where: { [field]: value }, // Corrected syntax for `findOne`
            });
            console.log('isExist', isExist);
            return !!isExist;
        } catch (error) {
            if (error instanceof EntityPropertyNotFoundError) {
                throw new NotFoundException(error.message);
            }
            console.error('error by exist dto', error);
            throw new InternalServerErrorException(error.message);
        }
    }

    defaultMessage?(args?: ValidationArguments): string {
        return `'${args.property}' ${args.value} doesn't exist`;
    }
}

export function Exists(
    model: EntityTarget<any>,
    field: string,
    validationOptions?: ValidationOptions,
) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [model, field],
            validator: ExistsConstraint,
        });
    };
}
