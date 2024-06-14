import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { CreatePayableDto } from './dto/create-payable.dto';

@Injectable()
export class PayablesService {
  constructor(private prisma: PrismaService) {}

  async create(createPayableDto: CreatePayableDto) {
    return await this.prisma.payable.create({ data: createPayableDto });
  }

  async findAll() {
    return await this.prisma.payable.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.payable.findUnique({ where: { id } });
  }

  async update(id: string, updatePayableDto: UpdatePayableDto) {
    return await this.prisma.payable.update({
      where: { id: id },
      data: updatePayableDto,
    });
  }

  async remove(id: string) {
    await this.prisma.payable.delete({ where: { id } });
  }
}
