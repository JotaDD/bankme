import { ApiProperty } from "@nestjs/swagger";
import { IsJWT } from "class-validator";

export class AuthDto {
  @ApiProperty({
    type: 'string',
    format: 'jwt',
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFwcm92YW1lIiwic3ViIjoiNTZjMmM1MWMtMTg4ZS00MDQzLWE5MWYtZWYwZDU5ZGZmZjM0IiwiaWF0IjoxNzE4OTA2NjQ2LCJleHAiOjE3MTg5MDY3MDZ9.61Hn9CpiKj2QcRK3GZDMbjoOA01VRVekIMBDpV6nSUI"
  })
  @IsJWT()
  readonly token: string
}