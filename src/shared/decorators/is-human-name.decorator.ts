import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsHumanName(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsHumanName',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;

          const trimmed = value.trim();
          if (!trimmed) return false;

          const nameRegex = /^[A-Za-zÀ-ỹ]+(?:\s+[A-Za-zÀ-ỹ]+)*$/u;
          return nameRegex.test(trimmed);
        },
        defaultMessage: (args: ValidationArguments) => {
          return `${args.property} must be a valid human name`;
        },
      },
    });
  };
}
