import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class PaymentMethodService {
  constructor(private readonly prisma: PrismaService) {}

   async create(createPaymentMethodDto: CreatePaymentMethodDto) {
    return await this.prisma.paymentMethod.create({
      data: {
        id_payment_method : createPaymentMethodDto.id_payment_method,
        card_number: createPaymentMethodDto.card_number,
        expiration_date:createPaymentMethodDto.expiration_date,
        customer_full_name:createPaymentMethodDto.customer_full_name,
        typeCard:createPaymentMethodDto.typeCard,
        customer:{ connect :{ dni_customer : createPaymentMethodDto.customerId}}
      }
    });
  }

  async findAll() {
    return await this.prisma.paymentMethod.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.paymentMethod.findUnique({
      where:{
        id_payment_method:id
      }
    });
  }

  async update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return await this.prisma.paymentMethod.update({
      where: {
        id_payment_method: id
      },
      data:{
        card_number: updatePaymentMethodDto.card_number,
        expiration_date: updatePaymentMethodDto.expiration_date
      }
    });
  }

  async remove(id: string) {
    return await this.prisma.paymentMethod.delete({
      where : {
        id_payment_method:id
      }
    });
  }
}
