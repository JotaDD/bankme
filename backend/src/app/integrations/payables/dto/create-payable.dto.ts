import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { MessageHelper } from 'src/app/helpers/messages.helper';

export class CreatePayableDto {
  @ApiProperty({
    nullable: false,
    required: true,
    type: Number,
    example: 190.55,
  })
  @IsNotEmpty({ message: MessageHelper.NOT_EMPTY })
  @IsNumber({}, { message: MessageHelper.ONLY_NUMBER })
  value: number;

  @ApiProperty({
    example: '2024-04-21T19:30',
    description: "Se o campo estiver vazio, a data de emissão será o momento que o recebível for cadastrado.",
    nullable: false,
    required: true
  })
  emissionDate: Date;

  @ApiProperty({
    nullable: false,
    required: true,
    type: 'string',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty({ message: MessageHelper.NOT_EMPTY })
  assignorId: string;

}
