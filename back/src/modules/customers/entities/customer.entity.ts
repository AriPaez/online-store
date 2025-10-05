import { IsString } from 'class-validator';
import { Person } from 'src/modules/common/entities/person.entity';

export class CustomerEntity extends Person {
  @IsString()
  dni_customer: string;
}
