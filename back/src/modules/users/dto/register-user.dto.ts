import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  dni_user: string;
  @IsString()
  name: string;
  @IsString()
  lastname: string;
  @IsString()
  username: string;
  @IsStrongPassword()
  password: string;
  @IsString()
  email: string;
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  birthdate: string;
  @IsString()
  address: string;
  @IsString()
  number_phone: string;
  @IsString()
  role: string;
}
