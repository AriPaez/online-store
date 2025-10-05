import { IsString } from 'class-validator';
import { Person } from 'src/modules/common/entities/person.entity';

export class CreateCustomerDto extends Person {
  @IsString()
  dni_customer: string;
}
