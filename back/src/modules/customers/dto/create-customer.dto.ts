import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Person } from 'src/modules/common/entities/person.entity';

export class CreateCustomerDto extends Person {
  @ApiProperty({ example: '12345678', description: 'DNI user' })
  @IsString()
  dni_customer: string;
}
