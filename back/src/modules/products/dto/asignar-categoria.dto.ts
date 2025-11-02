import { IsNotEmpty, IsString } from 'class-validator';
export class AsignarCategoriaDto {
  @IsNotEmpty()
  @IsString()
  category: string;
}
