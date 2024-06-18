import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Request as RequestInterface } from 'express';
import { AuthService } from './auth.service';
import { User } from 'src/interfaces';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async signIn(@Request() req: RequestInterface) {
    return await this.authService.signIn(req.user as User);
  }
}
