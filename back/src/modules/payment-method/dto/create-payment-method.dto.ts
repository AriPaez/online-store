import {IsDate, IsString } from 'class-validator'
import { Type } from 'class-transformer';
export class CreatePaymentMethodDto { 
    @IsString() id_payment_method :string; 
    @IsString() card_number : string;
    @Type( ()=> Date)
    @IsDate() expiration_date : Date;
    @IsString() customer_full_name : string;
    @IsString() typeCard : string;
    @IsString() customerId: string;
}
