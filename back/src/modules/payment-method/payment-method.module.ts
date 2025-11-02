import { Module } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethodController } from './payment-method.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '../common/jwt/jwt.module';
@Module({
  imports: [JwtModule, PrismaModule],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
})
export class PaymentMethodModule {}
