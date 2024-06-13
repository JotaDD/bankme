import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

export class User {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id?: UUID;

  @ApiProperty({ nullable: false, required: true, example: 'aprovame' })
  login: string;

  @ApiProperty({ nullable: false, required: true, example: 'aprovame' })
  password: string;
}
