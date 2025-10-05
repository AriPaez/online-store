import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { JwtModule } from '../common/jwt/jwt.module';

@Module({
  imports: [JwtModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
