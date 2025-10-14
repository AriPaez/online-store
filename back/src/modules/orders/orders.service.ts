import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class OrdersService extends PrismaClient{
 async create(createOrderDto: CreateOrderDto) {
    return this.orders.create({
      data : {
        id_order: createOrderDto.id_order,
        status: createOrderDto.status,
        customer:{
          connect: {dni_customer:createOrderDto.dni_customer}
        }
      }
    });
  }

  async findAll() {
    return this.orders.findMany();
  }

  async findOne(id: string) {
    return this.orders.findUnique({
      where:{
        id_order:id
      }
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orders.update({
      where:{
        id_order:id
      },
      data:{
        status: updateOrderDto.status
      }
    });
  }

  async remove(id: string) {
    return this.orders.delete({
      where:{
        id_order:id
      }
    }) ;
  }
}
