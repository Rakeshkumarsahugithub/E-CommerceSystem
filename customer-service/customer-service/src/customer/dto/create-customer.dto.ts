import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}