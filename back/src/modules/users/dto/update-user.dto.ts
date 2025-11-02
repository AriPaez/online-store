import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'Juan',
    description: 'Updated first name of the user (optional)',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'Perez',
    description: 'Updated last name of the user (optional)',
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({
    example: 'jperez',
    description: 'Updated username for login (optional)',
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({
    example: 'j.perez@example.com',
    description: 'Updated email address of the user (optional)',
  })
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    example: 'StrongP@ssw0rd!',
    description: 'Updated password (must be strong, optional)',
  })
  @IsString()
  @IsStrongPassword()
  @IsOptional()
  password?: string;
}
