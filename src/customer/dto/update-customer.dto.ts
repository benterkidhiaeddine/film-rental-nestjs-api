import {
  IsInt,
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsTimeZone,
} from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsOptional()
  @IsInt()
  store_id: number;

  @IsOptional()
  @IsInt()
  address_id: number;

  @IsOptional()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsBoolean()
  activebool: boolean;

  @IsOptional()
  @IsTimeZone()
  timezone: string;
}
