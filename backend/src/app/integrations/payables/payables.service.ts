import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { CreatePayableDto } from './dto/create-payable.dto';

@Injectable()
export class PayablesService {
  constructor(private prisma: PrismaService) {}

  create(createPayableDto: CreatePayableDto) {
    return this.prisma.payable.create({ data: createPayableDto });
  }

  findAll() {
    return this.prisma.payable.findMany();
  }

  findOne(id: string) {
    return this.prisma.payable.findUnique({ where: { id } });
  }

  update(id: number, updatePayableDto: UpdatePayableDto) {
    return `This action updates a #${id} payable ${updatePayableDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} payable`;
  }
}
