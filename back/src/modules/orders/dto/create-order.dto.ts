import {IsString, IsEnum} from 'class-validator'
import {Status} from '@prisma/client'
export class CreateOrderDto {
    @IsString()
    id_order : string ;
    @IsString()
    dni_customer: string;
    @IsEnum(Status,{
    message: `Los estados son los siguientes: ${Object.values(Status).join(', ')}`
  })
    status : Status;
}
