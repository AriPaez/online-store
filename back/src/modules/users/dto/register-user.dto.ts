import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Person } from 'src/modules/common/entities/person.entity';

export class RegisterUserDto extends Person {
  @ApiProperty({
    example: '12345678',
    description: 'Unique identifier (DNI) of the user',
  })
  @IsString()
  dni_user: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Role assigned to the user',
  })
  @IsString()
  role: string;
}
