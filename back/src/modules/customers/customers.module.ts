import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { JwtModule } from '../common/jwt/jwt.module';

@Module({
  imports: [JwtModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
