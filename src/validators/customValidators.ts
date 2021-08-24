import { registerDecorator, ValidationOptions } from 'class-validator';
import { parseISO, isValid } from 'date-fns';

export function IsOnlyDate(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsOnlyDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        // TODO Add message for wrong leap day 2021-02-29
        message: 'Please provide date in "YYYY-MM-DD" format',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          try {
            return isValid(parseISO(value));
          } catch {
            return false;
          }
        },
      },
    });
  };
}
