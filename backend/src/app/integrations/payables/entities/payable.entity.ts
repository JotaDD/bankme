import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { Payable } from 'src/interfaces';

export class PayableEntity implements Payable {
  @ApiProperty({
    nullable: false,
    required: true,
    type: 'string',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id?: UUID;

  @ApiProperty({
    nullable: false,
    required: true,
    type: Number,
    example: 190.55,
  })
  value: number;

  @ApiProperty({ nullable: false, required: true, example: 'johnny@test.com' })
  emissionDate: Date;

  @ApiProperty({
    nullable: false,
    required: true,
    type: 'string',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  assignorId: UUID;
}
