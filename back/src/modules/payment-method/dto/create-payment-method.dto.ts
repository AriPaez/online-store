import { IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePaymentMethodDto {
  @IsString() id_payment_method: string;
  @ApiProperty({
    example: '4111111111111111',
    description: 'Credit or debit card number',
  })
  @IsString()
  card_number: string;
  @ApiProperty({
    example: '2026-07-01',
    description: 'Card expiration date in ISO ',
    type: String,
    format: 'date',
  })
  @Type(() => Date)
  @IsDate()
  expiration_date: Date;
  @ApiProperty({
    example: 'Juan Perez',
    description: 'Full name ',
  })
  @IsString()
  customer_full_name: string;
  @ApiProperty({
    example: 'VISA',
    description: 'Type of card, VISA',
  })
  @IsString()
  typeCard: string;
  @ApiProperty({
    example: '7b61c6db-84ba-410b-8975-10a521887639',
    description:
      'Identifier of the customer associated with the payment method',
  })
  @IsString()
  customerId: string;
}
