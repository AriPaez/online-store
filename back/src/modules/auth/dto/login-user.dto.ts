import { IsString, IsStrongPassword } from 'class-validator';

export class LoginUserDto {
  @IsString()
  username: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
