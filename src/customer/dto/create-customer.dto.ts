import {
  IsInt,
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
} from 'class-validator';

export class CreateCustomerDto {
  @IsInt()
  store_id: number;

  @IsInt()
  address_id: number;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsBoolean()
  activebool: boolean;
}
