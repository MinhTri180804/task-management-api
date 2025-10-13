import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';

export class IsNotNullConstraint implements ValidatorConstraintInterface {
  validate(value: any): Promise<boolean> | boolean {
    return value !== null;
  }

  defaultMessage(args?: ValidationArguments): string {
    return `${args?.property} cannot be null`;
  }
}

export function IsNotNull(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsNotNull',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value !== null;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should not be null`;
        },
      },
    });
  };
}
