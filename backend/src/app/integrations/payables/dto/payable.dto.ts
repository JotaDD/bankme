import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { MessageHelper } from 'src/app/helpers/messages.helper';
import { Assignor } from 'src/interfaces';
import { PayableEntity } from '../entities/payable.entity';
import { AssignorDto } from '../../assignors/dto/assignor.dto';

export class PayableDto {
  @ApiProperty({
    nullable: false,
    required: true,
    type: 'string',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsUUID()
  readonly id: string

  @ApiProperty({
    nullable: false,
    required: true,
    type: Number,
    example: 190.55,
  })
  @IsNotEmpty({ message: MessageHelper.NOT_EMPTY })
  @IsNumber({}, { message: MessageHelper.ONLY_NUMBER })
  readonly value: number;

  @ApiProperty({
    example: '2024-04-21T19:30',
    description: "Se o campo estiver vazio, a data de emissão será o momento que o recebível for cadastrado.",
    nullable: false,
    required: true
  })
  @IsNotEmpty({ message: MessageHelper.NOT_EMPTY })
  @IsDate()
  readonly emissionDate: Date;

  @ApiProperty({
    nullable: false,
    required: true,
    type: 'string',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty({ message: MessageHelper.NOT_EMPTY })
  readonly assignorId: string;

  @ApiProperty({
    example: {
      name: "Johnny Test",
      document: 12345678901,
      email: "johny@test.com",
      phone: "18998080808"
    },
    type: AssignorDto
  })
  readonly assignor?: Omit<Assignor, 'id'>;
}
