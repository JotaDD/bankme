import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PayableEntity } from './entities/payable.entity';
import { PayablesService } from './payables.service';

@Controller()
@ApiTags('Payables')
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) {}

  @Post()
  @ApiCreatedResponse({ status: 201, type: PayableEntity })
  async create(
    @Body() createPayableDto: CreatePayableDto,
  ): Promise<CreatePayableDto> {
    return await this.payablesService.create(createPayableDto);
  }

  @Get()
  async findAll(): Promise<CreatePayableDto[]> {
    return await this.payablesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PayableEntity })
  async findOne(@Param('id') id: string): Promise<CreatePayableDto> {
    return await this.payablesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PayableEntity })
  update(
    @Param('id') id: string,
    @Body() updatePayableDto: UpdatePayableDto,
  ): Promise<UpdatePayableDto> {
    return this.payablesService.update(id, updatePayableDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PayableEntity })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.payablesService.remove(id);
  }
}
