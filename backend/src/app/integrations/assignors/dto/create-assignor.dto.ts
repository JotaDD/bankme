import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateAssignorDto {
  @ApiProperty({ example: '12345678901' })
  @IsNotEmpty()
  @MaxLength(30)
  @Transform(({ value }) => value.replace(/\D/g, ''))
  document: string;

  @ApiProperty({ example: 'johnny@test.com' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'email must be valid' })
  @MaxLength(140)
  email: string;

  @ApiProperty({
    example: '11999998888',
    description: 'Only numbers, the api will remove all non-numeric characters',
  })
  @IsNotEmpty()
  @MaxLength(20)
  @Transform(({ value }) => value.replace(/\D/g, ''))
  phone: string;

  @ApiProperty({ example: 'Johnny Test' })
  @IsNotEmpty()
  @MaxLength(140)
  name: string;
}
