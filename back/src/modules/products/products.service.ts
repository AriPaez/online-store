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
    const prodCreate=  await this.prisma.products.create({
      data:{
        id_producto:createProductDto.id_producto,
        price:createProductDto.price,
        description:createProductDto.description,
        category:createProductDto.category,
        stock: createProductDto.stock
      }
    })
    return{
      id:prodCreate.id_producto,
       name: prodCreate.description ?? '',
      description: prodCreate.description ?? '',
      price: prodCreate.price,
      category: prodCreate.category,
      stock: prodCreate.stock
    }
  }

  async findAll() {
    const productos =  await this.prisma.products.findMany();
    return productos.map( pro => {
      let price_final=pro.price
      if(pro.discount_price && pro.discount_price > 0 ){
         price_final = pro.price - ((pro.price * pro.discount_price)/100)
          }
        return{
          id: pro.id_producto,
          name: pro.description ?? '',
          description: pro.description ?? '',
          ...pro,
          price: price_final
        }
      }
    )
  }

  async findOne(id: string) {
    const producto= await this.prisma.products.findUnique({
      where:{
        id_producto:id
      }
    });
    if(!producto) return null;
    return {
      id: producto.id_producto,
       name: producto.description ?? '',
      description: producto.description ?? '',
      ...producto
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const prodUpdate=  await this.prisma.products.update({
      where:{
        id_producto:id
      },
      data:{
         price:updateProductDto.price,
        description:updateProductDto.description,
        category:updateProductDto.category
      }
    }) ;
    return{
      id:prodUpdate.id_producto,
       name: prodUpdate.description ?? '',
      description: prodUpdate.description ?? '',
      ...prodUpdate
    }
  }

  async remove(id: string) {
    const prodDelete= await this.prisma.products.delete({
      where:{
        id_producto:id
      }
    });
    return{
      id: prodDelete.id_producto,
       name: prodDelete.description ?? '',
      description: prodDelete.description ?? '',
      ...prodDelete
    }
  }
  //ACA VOY A PONER FUNCIONES PARA PRODUCTOS (0 W 0)/ agregue stock 
  //ESTO ES PARA EL USUARIO ADMIN
  async aplicarDescuento(id:string , dtoDescuento: AplicarDescuentoDto){
    const producto = await this.findOne(id)
    if (!producto) throw new NotFoundException('Producto no encontrado');
    const prod_new= await this.prisma.products.update({
      where: { id_producto: id},
      data: {discount_price : dtoDescuento.porcentaje}
    });
    return {
       id:prod_new.id_producto,
        name: prod_new.description ?? '',
      description: prod_new.description ?? '',
      price: prod_new.price,
      category: prod_new.category,
      stock: prod_new.stock
    }
  }
  
  async asignarCategoria(id: string ,dtoCategoria : AsignarCategoriaDto){
      const producto = await this.findOne(id)
     if (!producto) throw new NotFoundException('Producto no encontrado');
     const pCategoria=  await this.prisma.products.update({
      where:{ id_producto : id},
      data:{ category : dtoCategoria.category}
     })
     return{
      id:pCategoria.id_producto
     }
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
    return listaProductos.map(p=>({
      id:p.id_producto,
       name: p.description ?? '',
      description: p.description ?? '',
      ...p
    }));
  }

  async filtrarPorRangoDePrecioMax(price_max: number){
      const prodPrecioMax= await this.prisma.products.findMany({
        where:{
          price : {
            lte: price_max
          }
        }
      })
      return prodPrecioMax.map(p =>({
           id:p.id_producto,
            name: p.description ?? '',
           description: p.description ?? '',
           price: p.price,
           category: p.category ?? '',
           stock: p.stock
      }))
     
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
