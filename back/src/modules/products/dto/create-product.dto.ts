/*id_producto                 String @id
  price                       Float
  description                 String
  category                     String */
import {IsString, IsNumber, Min} from 'class-validator'
export class CreateProductDto {
  @IsString() id_producto: string;
  @IsNumber({ maxDecimalPlaces: 2 }) @Min(0) price: number;
  @IsString() description : string;
  @IsString() category : string;
}
