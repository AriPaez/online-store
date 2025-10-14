import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProductsService extends PrismaClient{
  async create(createProductDto: CreateProductDto) {
    return await this.products.create({
      data:{
        id_producto:createProductDto.id_producto,
        price:createProductDto.price,
        description:createProductDto.description,
        category:createProductDto.category
      }
    })
  }

  async findAll() {
    return await this.products.findMany();
  }

  async findOne(id: string) {
    return await this.products.findUnique({
      where:{
        id_producto:id
      }
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.products.update({
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
    return await this.products.delete({
      where:{
        id_producto:id
      }
    });
  }
}
