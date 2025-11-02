import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentMethodDto } from './create-payment-method.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePaymentMethodDto extends PartialType(
  CreatePaymentMethodDto,
) {
  @ApiPropertyOptional({
    example: '4111111111111111',
    description: 'Updated credit or debit card number (optional)',
  })
  @IsString()
  card_number?: string;

  @ApiPropertyOptional({
    example: '2026-07-01',
    description: 'Updated card expiration date - optional',
    type: String,
    format: 'date',
  })
  @Type(() => Date)
  @IsDate()
  expiration_date?: Date;
}
