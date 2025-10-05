import { Type } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsDate,
  IsStrongPassword,
  IsNotEmpty,
} from 'class-validator';

export abstract class Person {
  @IsString()
  name: string;
  @IsString()
  lastname: string;
  @IsString()
  username: string;
  @IsStrongPassword()
  password: string;
  @IsEmail()
  email: string;
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  birthdate: Date;
  @IsString()
  address: string;
  @IsString()
  number_phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}
