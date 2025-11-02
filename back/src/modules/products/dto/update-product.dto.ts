import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({
    example: 79.99,
    description: 'Updated price of the product (optional, max 2 decimals)',
    minimum: 0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price?: number;

  @ApiPropertyOptional({
    example: 'Updated description for the product',
    description: 'Updated product description (optional)',
  })
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'Shirts',
    description: 'Updated product category (optional)',
  })
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    example: 50,
    description: 'Updated stock quantity (optional)',
  })
  @IsNumber()
  stock?: number;
}
