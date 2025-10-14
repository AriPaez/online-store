import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../common/guards/auth.guard';
@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const existe = await this.productsService.findOne(createProductDto.id_producto)
    if(existe) throw new ConflictException('Ya existe el producto') 
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const productoEncontrado = await this.productsService.findOne(id)
    if(!productoEncontrado) throw new NotFoundException('No existe el producto') 
    return productoEncontrado;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      return await this.productsService.update(id, updateProductDto);
    } catch (error) {
      throw new NotFoundException('El producto no existe')
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
   try {
     return await this.productsService.remove(id);
   } catch (error) {
     throw new NotFoundException('No existe el producto')
   }
  }
}
