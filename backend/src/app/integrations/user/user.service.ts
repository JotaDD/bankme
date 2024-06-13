import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../../database/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(login: string) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { login },
      });
      return user;
    } catch (error) {
      return null;
    }
  }
}
