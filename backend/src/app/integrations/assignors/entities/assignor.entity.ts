import { ApiProperty } from '@nestjs/swagger';
import { Assignor } from 'src/interfaces';

export class AssignorEntity implements Assignor {
  @ApiProperty({
    nullable: false,
    required: true,
    type: 'string',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({ nullable: false, required: true, example: '12345678901' })
  document: string;

  @ApiProperty({ nullable: false, required: true, example: 'johnny@test.com' })
  email: string;

  @ApiProperty({
    nullable: false,
    required: true,
    example: '11999998888',
    description: 'Only numbers, the api will remove all non-numeric characters',
  })
  phone: string;

  @ApiProperty({ nullable: false, required: true, example: 'Johnny Test' })
  name: string;
}
