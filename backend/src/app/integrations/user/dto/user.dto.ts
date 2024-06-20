import { ApiProperty } from "@nestjs/swagger"

export class UserDto {

  @ApiProperty({ nullable: false, required: true, example: 'aprovame' })
  readonly login: string

  @ApiProperty({ nullable: false, required: true, example: 'aprovame' })
  readonly password: string
}