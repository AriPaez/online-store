import { IsString, IsStrongPassword } from 'class-validator';

export class ChangePasswordUserDto {
  @IsString()
  id: string;
  @IsString()
  @IsStrongPassword()
  passwordOld: string;
  @IsString()
  @IsStrongPassword()
  passwordConfirm: string;
}
