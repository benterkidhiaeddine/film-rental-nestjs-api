import { IsDateString, IsInt, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateRentalDto } from './create-rental.dto';

export class UpdateRentalDto extends PartialType(CreateRentalDto) {
  @IsOptional()
  @IsDateString()
  rental_date?: string;

  @IsOptional()
  @IsInt()
  inventory_id?: number;

  @IsOptional()
  @IsInt()
  customer_id?: number;

  @IsOptional()
  @IsDateString()
  return_date?: string;

  @IsOptional()
  @IsInt()
  staff_id?: number;
}
