import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Status } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

 async create(createOrderDto: CreateOrderDto) {
    return this.prisma.orders.create({
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
    return this.prisma.orders.findMany();
  }

  async findOne(id: string) {
    return this.prisma.orders.findUnique({
      where:{
        id_order:id
      }
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.prisma.orders.update({
      where:{
        id_order:id
      },
      data:{
        status: updateOrderDto.status
      }
    });
  }

  async remove(id: string) {
    return this.prisma.orders.delete({
      where:{
        id_order:id
      }
    }) ;
  }
  // AGREGO MAS FUNCIONES PARA LAS ORDENES
  async totalOrden(){}
  async calcularImpuestos(id_order){}
  async calcularCostoEnvio(id_order){}
  async cambiarEstado(id_order, nuevoEstado:Status){}
  async cancelarOrden(id_order){}
  async filtrarOrdenesPorFecha(desde, hasta){}
  async marcarComoPagada(id_order, metodoPago) {}
  async actualizarCantidad(id_order, id_producto, nuevaCantidad: number){}
  async ordenesPendientes() {}
  async ordenesCompletadas(){}
}
