import { Injectable, NotFoundException } from '@nestjs/common';
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
  async totalOrden(){
    const ordens = await this.prisma.orders.findMany({
      include: {
        products: true
      }
    });
    const totalGeneral = ordens.reduce((acum, orden) => {
    const totalOrden = orden.products.reduce((sum, prod) => sum + (prod.price ?? 0), 0);
    return acum + totalOrden;
  }, 0);
    return {totalGeneral};
  }
  //async calcularImpuestos(id_order){}
  //async calcularCostoEnvio(id_order){}
  async cambiarEstado(id_order, nuevoEstado:Status){
    const orden = await this.prisma.orders.findUnique({
      where: { id_order },
    });

    if (!orden) {
      throw new NotFoundException(`No se encontró la orden con ID ${id_order}`);
    }
    const ordenActualizada = await this.prisma.orders.update({
      where: { id_order },
      data: { status: nuevoEstado },
    });
    return {
      id: ordenActualizada.id_order,
      estado: ordenActualizada.status,
      message: `El estado de la orden se cambió correctamente a ${nuevoEstado}.`,
    };
  }
  //async cancelarOrden(id_order){}
  //async filtrarOrdenesPorFecha(desde, hasta){}
  //async marcarComoPagada(id_order, metodoPago) {}
  //async actualizarCantidad(id_order, id_producto, nuevaCantidad: number){}
  //async ordenesPendientes() {}
  //async ordenesCompletadas(){}
}
