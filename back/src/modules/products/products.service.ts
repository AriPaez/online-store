import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AplicarDescuentoDto} from './dto/aplicar-descuento.dto';
import { AsignarCategoriaDto } from './dto/asignar-categoria.dto';

@Injectable()
export class ProductsService{
  constructor(private readonly prisma: PrismaService) {}
 
  //CRUD BASICO  \(0 W 0)/
  async create(createProductDto: CreateProductDto) {
    return await this.prisma.products.create({
      data:{
        id_producto:createProductDto.id_producto,
        price:createProductDto.price,
        description:createProductDto.description,
        category:createProductDto.category,
        stock: createProductDto.stock
      }
    })
  }

  async findAll() {
    const productos =  await this.prisma.products.findMany();
    return productos.map( pro => {
      if(pro.discount_price && pro.discount_price > 0 ){
        const precio_descu = pro.price - ((pro.price * pro.discount_price)/100)
        return{
          ...pro,
          price : precio_descu
        }
      }
      return pro
    })
  }

  async findOne(id: string) {
    return await this.prisma.products.findUnique({
      where:{
        id_producto:id
      }
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.prisma.products.update({
      where:{
        id_producto:id
      },
      data:{
         price:updateProductDto.price,
        description:updateProductDto.description,
        category:updateProductDto.category
      }
    }) ;
  }

  async remove(id: string) {
    return await this.prisma.products.delete({
      where:{
        id_producto:id
      }
    });
  }
  //ACA VOY A PONER FUNCIONES PARA PRODUCTOS (0 W 0)/ agregue stock 
  //ESTO ES PARA EL USUARIO ADMIN
  async aplicarDescuento(id:string , dtoDescuento: AplicarDescuentoDto){
    const producto = await this.findOne(id)
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return await this.prisma.products.update({
      where: { id_producto: id},
      data: {discount_price : dtoDescuento.porcentaje}
    });
  }
  
  async asignarCategoria(id: string ,dtoCategoria : AsignarCategoriaDto){
      const producto = await this.findOne(id)
     if (!producto) throw new NotFoundException('Producto no encontrado');
     return await this.prisma.products.update({
      where:{ id_producto : id},
      data:{ category : dtoCategoria.category}
     })
  }

  async valorTotalInventario(){
      const productos = await this.prisma.products.findMany();
      const sumaInventario = productos.reduce((acc, prod)=>acc + prod.price* prod.stock,0)
      return  sumaInventario;
  }

  //ESTO PARA EL USUARIO DEFAULT, OSEA EL CLIENTE
  
  async obtenerProductosPorCategoria(categoria: string){
    const listaProductos = await this.prisma.products.findMany({
      where: {
        category : categoria
      }
    })
    if(listaProductos.length ===0){
      throw new NotFoundException(`No se encontraron productos en la categoría "${categoria}"`);
    }
    return listaProductos;
  }

  async filtrarPorRangoDePrecioMax(price_max: number){
      return await this.prisma.products.findMany({
        where:{
          price : {
            lte: price_max
          }
        }
      })
     
  }
// me gustaria poner nombre del producto y dejar la descripcion para adjetivos del objeto, como remera color tanto...
// en el schema description es para el nombre del producto.
  //async buscarPorNombre(description: string){}

  async verificarDisponibilidad(id: string){
    const producto=  await this.prisma.products.findUnique({
      where:{
        id_producto: id,
        stock :{
          gt:0
        }
        
      },
      select :{
        stock: true,
      }
    })
    if(!producto)
      throw new NotFoundException('Producto no disponible o sin stock');
    return producto.stock
  }


}
