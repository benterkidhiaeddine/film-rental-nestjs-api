/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type } from 'class-transformer';
import { IsDateString, IsInt, Validate } from 'class-validator';

import { RentalPeriodConstraint } from 'src/shared/validation/rental-period-constraint';

export class CreateRentalDto {
  @IsDateString()
  rental_date: string;

  @IsInt()
  inventory_id: number;

  @IsInt()
  customer_id: number;

  @IsDateString()
  @Validate(RentalPeriodConstraint)
  return_date: string;

  @IsInt()
  staff_id: number;

  //@Validate(IsUniqueRentalConstraint)
  //uniqueRental: boolean; // This is a dummy field for validation
}
