import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
export class AplicarDescuentoDto{
    @IsNumber()
    @Min(0)
    @Max(100)
    porcentaje: number;
}