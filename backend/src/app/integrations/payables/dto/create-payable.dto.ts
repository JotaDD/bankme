import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePayableDto {
  @ApiProperty({ example: 100.0 })
  @IsNotEmpty()
  value: number;

  @ApiProperty({ example: '2021-01-01' })
  @IsNotEmpty()
  emissionDate: Date;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  assignorId: string;
}
