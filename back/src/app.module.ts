import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { CustomersModule } from './modules/customers/customers.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';

@Module({
  imports: [UsersModule, ProductsModule, OrdersModule, CustomersModule, PaymentMethodModule],
})
export class AppModule {}
