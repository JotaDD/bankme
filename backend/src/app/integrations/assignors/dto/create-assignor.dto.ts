import { ApiProperty } from '@nestjs/swagger';

export class CreateAssignorDto {
  @ApiProperty()
  document: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  name: string;
}
