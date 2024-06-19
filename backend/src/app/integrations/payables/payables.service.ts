import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { PayableDto } from './dto/payable.dto';

import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PayableNotFoundException } from './exceptions/payable-not-found.exception';
import { AssignorsService } from '../assignors/assignors.service';
import { AssignorNotFoundException } from '../assignors/exceptions';
import { async } from 'rxjs';

@Injectable()
export class PayablesService {
  constructor(
    private prisma: PrismaService,
    private assignorService: AssignorsService
  ) { }

  async create(createPayableDto: CreatePayableDto): Promise<PayableDto> {
    const assignor = await this.assignorService.findOne(createPayableDto.assignorId)
    if (!assignor) {
      throw new AssignorNotFoundException()
    }
    createPayableDto.assignorId = assignor.id
    createPayableDto.emissionDate = createPayableDto.emissionDate ? new Date(createPayableDto.emissionDate) : new Date()

    return await this.prisma.payable.create({
      data: createPayableDto
    })
  }


  async findAll(): Promise<PayableDto[]> {
    return await this.prisma.payable.findMany({
      include: {
        assignor: {
          select: {
            name: true,
            document: true,
            email: true,
            phone: true,
          }
        }
      }
    });
  }

  async findOne(id: string): Promise<PayableDto> {
    const payable = await this.prisma.payable.findUnique({
      where: { id }, include: {
        assignor: {
          select: {
            name: true,
            document: true,
            email: true,
            phone: true,
          }
        },
      }
    })
    if (!payable) {
      throw new PayableNotFoundException();
    }
    return payable
  }

  async update(id: string, updatePayableDto: UpdatePayableDto) {
    const payable = await this.prisma.payable.findUnique({ where: { id } })

    const assignorToBeUpdated = await this.prisma.assignor.findUnique({
      where: { id: updatePayableDto.assignorId }
    })

    if (!payable) {
      throw new PayableNotFoundException()
    }

    if (!assignorToBeUpdated) {
      throw new AssignorNotFoundException()
    }

    return await this.prisma.payable.update({
      where: { id: payable.id },
      data: updatePayableDto,
      include: {
        assignor: {
          select: {
            name: true,
            document: true,
            email: true,
            phone: true,
          }
        }
      }
    });
  }
  
  async remove(id: string) {
    try {
      await this.prisma.payable.delete({ where: { id } });
      return {
        "statusCode": HttpStatus.OK,
        "message": "Recebível removido com sucesso!"
      }
    } catch (error) {
      throw new PayableNotFoundException();
    }
  }

}
