import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

@Injectable()
export class AssignorsService {
  constructor(private prisma: PrismaService) {}

  async create(createAssignorDto: CreateAssignorDto) {
    return await this.prisma.assignor.create({
      data: createAssignorDto,
    });
  }

  async findAll() {
    return await this.prisma.assignor.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.assignor.findUnique({ where: { id } });
  }

  async update(id: string, updateAssignorDto: UpdateAssignorDto) {
    return await this.prisma.assignor.update({
      where: { id },
      data: updateAssignorDto,
    });
  }

  async remove(id: string) {
    await this.prisma.assignor.delete({ where: { id } });
  }
}
