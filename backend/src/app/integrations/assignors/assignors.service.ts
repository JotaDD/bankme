import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { AssignorEntity } from './entities/assignor.entity';
import { AssignorAlreadyExistsException } from './exceptions/assignor-already-exists.exception';
import { AssignorNotFoundException } from './exceptions/assignor-not-found.exception';

@Injectable()
export class AssignorsService {
  constructor(private prisma: PrismaService) { }

  async create(createAssignorDto: CreateAssignorDto): Promise<AssignorEntity> {
    const assignorAlreadyExists = await this.validateIfAssignorExists(createAssignorDto.document);
    if (assignorAlreadyExists) {
      throw new AssignorAlreadyExistsException();
    }
    return await this.prisma.assignor.create({ data: createAssignorDto });
  }

  async findAll(): Promise<AssignorEntity[]> {
    return await this.prisma.assignor.findMany();
  }

  async findOne(id: string) {
    const assignor = await this.prisma.assignor.findUnique({ where: { id } });
    if (!assignor) {
      throw new AssignorNotFoundException();
    }
    return assignor;
  }

  async update(id: string, updateAssignorDto: UpdateAssignorDto): Promise<AssignorEntity> {

    const assignorIsFound = await this.validateIfAssignorIsFound(id);
    if (!assignorIsFound) {
      throw new AssignorNotFoundException();
    }

    if (updateAssignorDto.document) {
      const assignorAlreadyExists = await this.validateIfAssignorExists(updateAssignorDto.document);
      if (assignorAlreadyExists) {
        throw new AssignorAlreadyExistsException();
      }
    }

    return await this.prisma.assignor.update({
      where: { id },
      data: updateAssignorDto,
    });

  }

  async remove(id: string) {
    try {
      await this.prisma.assignor.delete({ where: { id } });
      return {
        "statusCode": HttpStatus.OK,
        "message": "Cedente removido com sucesso!"
      }
    } catch (error) {
      throw new AssignorNotFoundException();
    }
  }

  async validateIfAssignorExists(document: string) {
    const assignorExists = await this.prisma.assignor.findUnique({ where: { document } });
    return !!assignorExists;
  }

  async validateIfAssignorIsFound(id: string) {
    const assignorIsFound = await this.prisma.assignor.findUnique({ where: { id } });
    return !!assignorIsFound;
  }

}
