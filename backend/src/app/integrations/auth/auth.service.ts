import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/interfaces';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string) {
    const user = await this.userService.findOne(login);

    if (user?.password !== password) {
      throw new UnauthorizedException('Não autorizado');
    }

    return user;
  }

  async signIn(user: User) {
    const payload = { login: user.login, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      token,
    };
  }
}
