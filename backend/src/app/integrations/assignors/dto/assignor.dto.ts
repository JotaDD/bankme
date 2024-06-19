import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsUUID, MaxLength } from 'class-validator';
import { MessageHelper } from '../../../helpers/messages.helper';

export class AssignorDto {

  @ApiProperty({ example: '12345678901' })
  @IsNotEmpty({ message: MessageHelper.NOT_EMPTY })
  @MaxLength(30, { message: MessageHelper.MAX_THIRTY })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  readonly document: string;

  @ApiProperty({ example: 'johnny@test.com' })
  @IsNotEmpty({ message: MessageHelper.NOT_EMPTY })
  @IsEmail({}, { message: MessageHelper.EMAIL_VALID })
  @MaxLength(140, { message: MessageHelper.MAX_ONE_FORTY })
  readonly email: string;

  @ApiProperty({
    example: '11999998888',
    description: 'Apenas números, a api vai remover qualquer caractere não-numérico',
  })
  @IsNotEmpty({ message: MessageHelper.NOT_EMPTY })
  @MaxLength(20, { message: MessageHelper.MAX_TWENTY })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  readonly phone: string;

  @ApiProperty({ example: 'Johnny Test' })
  @IsNotEmpty({ message: MessageHelper.NOT_EMPTY })
  @MaxLength(140, { message: MessageHelper.MAX_ONE_FORTY })
  readonly name: string;
}
