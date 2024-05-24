import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

@Injectable()
export class AssignorsService {
  constructor(private prisma: PrismaService) {}

  create(createAssignorDto: CreateAssignorDto) {
    return this.prisma.assignor.create({
      data: createAssignorDto,
    });
  }

  findAll() {
    return this.prisma.assignor.findMany();
  }

  findOne(id: string) {
    return this.prisma.assignor.findUnique({ where: { id } });
  }

  update(id: string, updateAssignorDto: UpdateAssignorDto) {
    return this.prisma.assignor.update({
      where: { id },
      data: updateAssignorDto,
    });
  }

  remove(id: string) {
    return this.prisma.assignor.delete({ where: { id } });
  }
}
