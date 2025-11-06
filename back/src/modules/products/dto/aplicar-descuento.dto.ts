import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max } from 'class-validator';
export class AplicarDescuentoDto {
  @ApiProperty({
    example: 15,
    description: 'Discount percentage to apply (between 0 and 100)',
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  porcentaje: number;
}
