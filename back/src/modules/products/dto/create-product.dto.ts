/*id_producto                 String @id
  price                       Float
  description                 String
  category                     String */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';
export class CreateProductDto {
  @ApiProperty({
    example: '7b61c6db-84ba-410b-8975-10a521887639',
    description: 'Unique identifier of the product',
  })
  @IsString()
  id_producto: string;

  @ApiProperty({
    example: 99.99,
    description: 'Product price (maximum two decimal places)',
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @IsString()
  description: string;

  @ApiProperty({
    example: 'Shirt',
    description: 'Category or classification of the product',
  })
  @IsString()
  category: string;

  @ApiProperty({
    example: 25,
    description: 'Current stock available for this product',
  })
  @IsNumber()
  stock: number;
}
