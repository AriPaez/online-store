import { IsString, IsStrongPassword } from 'class-validator';

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
  @IsString()
  birthdate: string;
  @IsString()
  address: string;
  @IsString()
  number_phone: string;
  @IsString()
  role: string;
}
