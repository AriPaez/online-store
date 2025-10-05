import { IsString } from 'class-validator';
import { Person } from 'src/modules/common/entities/person.entity';

export class UserEntity extends Person {
  @IsString()
  dni_user: string;
  @IsString()
  role: string;
}
