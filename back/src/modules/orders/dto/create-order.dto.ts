import { IsString, IsEnum } from 'class-validator';
import { Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class CreateOrderDto {
  @IsString()
  id_order: string;
  @ApiProperty({ example: '12345678', description: 'DNI customer' })
  @IsString()
  dni_customer: string;
  @IsEnum(Status, {
    message: `Los estados son los siguientes: ${Object.values(Status).join(', ')}`,
  })
  status: Status;
}
