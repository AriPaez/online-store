import { Module } from '@nestjs/common';
import { CustomersController } from 'src/modules/customers/customers.controller';
import { CustomersService } from 'src/modules/customers/customers.service';
import { UsersController } from 'src/modules/users/users.controller';
import { UsersService } from 'src/modules/users/users.service';
@Module({
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
})
export class AuthGuardModule {}
