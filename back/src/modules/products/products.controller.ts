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
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { AplicarDescuentoDto } from './dto/aplicar-descuento.dto';
import { User } from '../common/decorators/user.decorator';
import { CurrentUser } from '../common/interfaces/current-user.interface';
import { AsignarCategoriaDto } from './dto/asignar-categoria.dto';
@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
//TODO ESTO ES UN CRUD BASICO 
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const existe = await this.productsService.findOne(createProductDto.id_producto)
    if(existe) throw new ConflictException('Ya existe el producto') 
    return await this.productsService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const productoEncontrado = await this.productsService.findOne(id)
    if(!productoEncontrado) throw new NotFoundException('No existe el producto') 
    return  productoEncontrado;
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
  //********************************************/
  @Patch('descuento/:id')
  async aplicarDescuento(
    @Param('id') id : string, 
    @Body() dtoDescuento : AplicarDescuentoDto, 
    @User() user: any){
      console.log(user)
      if( user.role !== 'ADMIN'){
        throw new ForbiddenException('Solo los administradores pueden agregar descuento')
      }

      return await this.productsService.aplicarDescuento(id,dtoDescuento);
   }
    @Patch('categoria/:id')
        async asignaCateoria(
        @Param('id') id : string, 
        @Body() dtoCategoria : AsignarCategoriaDto, 
        @User() user: any){
          if( user.role !== 'ADMIN'){
            throw new ForbiddenException('Solo los administradores pueden asignar una categoria')
          }
          
          return await this.productsService.asignarCategoria(id,dtoCategoria);
   }
   @Get('categoria/:category')
   async listaProductoPorCategoria(@Param('category') category : string){
    const listaProductos = await this.productsService.obtenerProductosPorCategoria(category)
    return listaProductos
   }
   @Get('/lista/:max')
   async filtrarPorPrecioMax(@Param('max') max : string){
     const price = Number(max);
     if(isNaN(price)){
      throw new BadRequestException('Debe de ser un numero')
     }
      return await this.productsService.filtrarPorRangoDePrecioMax(price)
   }

  @Get('/stock/:id')
  async disponibilidadProducto(@Param('id') id: string){
    return await this.productsService.verificarDisponibilidad(id)
  }
  @Get('/totalinvetario')
  async totalInventario(){
    //@User() user: any
   /* if( user.role !== 'ADMIN'){
       throw new ForbiddenException('Solo los administradores pueden ver el total de inventario')
          }*/
    return await this.productsService.valorTotalInventario()
  }
   
}
