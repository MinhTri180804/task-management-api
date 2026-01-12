import { registerDecorator, ValidationOptions } from 'class-validator';

export function NameLength(
  min: number = 1,
  max: number = 30,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    return registerDecorator({
      name: 'NameLength',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          const length = value.trim().length;
          return length >= min && length <= max;
        },
        defaultMessage: () => {
          return `${propertyName} must be between ${min} and ${max} characters`;
        },
      },
    });
  };
}
