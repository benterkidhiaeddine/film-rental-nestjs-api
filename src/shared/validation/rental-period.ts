import { registerDecorator, ValidationOptions } from 'class-validator';
import { RentalPeriodConstraint } from './rental-period-constraint';

export function IsValidRentalPeriod(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'is-valid-rental-period',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: RentalPeriodConstraint, // Updated to match the RentalPeriodConstraint validator
    });
  };
}
