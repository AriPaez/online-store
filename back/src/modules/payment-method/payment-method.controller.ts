import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, NotFoundException } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';

@Controller('payment-method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Post()
  async create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    const existe=  await this.paymentMethodService.findOne(createPaymentMethodDto.id_payment_method)
    if(existe) throw new ConflictException('Ya existe el Metodo de pago') 
      return this.paymentMethodService.create(createPaymentMethodDto)
  }

  @Get()
  async findAll() {
    return await this.paymentMethodService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const metodoEncontrado = this.paymentMethodService.findOne(id)
    if(!metodoEncontrado) throw new NotFoundException('El metodo de pago no existe')
    return metodoEncontrado;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentMethodDto: UpdatePaymentMethodDto) {
   try {
      return this.paymentMethodService.update(id, updatePaymentMethodDto);
   } catch (error) {
        throw new NotFoundException('El metodo no existe')
   } 
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
   try {
       return this.paymentMethodService.remove(id);
   } catch (error) {
      throw new NotFoundException('El metodo no existe')
   }
  }
}
