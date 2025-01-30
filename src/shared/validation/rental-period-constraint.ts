/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { RentalRepository } from '../../rental/rental.repository';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreateRentalDto } from 'src/rental/dto/create-rental.dto';

@ValidatorConstraint({ async: true })
@Injectable()
export class RentalPeriodConstraint implements ValidatorConstraintInterface {
  constructor(private rentalRepository: RentalRepository) {}

  validate(value: any, validationArguments?: ValidationArguments): boolean {
    const dto = validationArguments?.object as CreateRentalDto;

    // Transform string to Date objects
    const rentalDate = new Date(dto.rental_date);
    const returnDate = new Date(dto.return_date);

    // Check if the rental period is between 1 and 3 weeks (7 to 21 days)
    const rentalPeriodInDays =
      (returnDate.getTime() - rentalDate.getTime()) / (1000 * 3600 * 24); // Convert ms to days
    if (rentalPeriodInDays < 7 || rentalPeriodInDays > 21) {
      return false; // Invalid period
    }

    // If everything checks out, return true
    return true;
  }

  defaultMessage(): string {
    return 'The rental period must be between 7 and 21 days.';
  }
}
