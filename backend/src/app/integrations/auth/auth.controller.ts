import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Request as RequestInterface } from 'express';
import { UserDto } from '../user/dto/user.dto';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post()
  @ApiBody({
    type: UserDto
  })
  @ApiCreatedResponse({ type: AuthDto })
  async signIn(@Request() req: RequestInterface): Promise<AuthDto> {
    const user = await this.authService.signIn(req.user as User);
    return user
  }
}
