import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name: string;
  @IsString()
  lastName: string;
  @IsString()
  username: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @IsStrongPassword()
  password: string;
}
