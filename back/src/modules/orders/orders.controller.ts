import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const existe = await this.ordersService.findOne(createOrderDto.id_order)
    if(existe) throw new ConflictException('Esta orden ya existe')
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
 async findOne(@Param('id') id: string) {
    const orderEncontrado = await this.ordersService.findOne(id)
    if(!orderEncontrado) throw new NotFoundException('Orden no encontrada')
    return orderEncontrado;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    try {
      return await this.ordersService.update(id, updateOrderDto);
    } catch (error) {
      throw new NotFoundException('No se encotro la orden')
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.ordersService.remove(id);
    } catch (error) {
      throw new NotFoundException('No se encotro la orden')
    }
  }
}
