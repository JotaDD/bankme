import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreatePayableDto } from './dto/create-payable.dto';
import { PayableDto } from './dto/payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PayableEntity } from './entities/payable.entity';
import { PayablesService } from './payables.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller()
@ApiTags('Payables')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) { }

  @Post()
  @ApiCreatedResponse({ description: 'Sucesso', type: PayableDto })
  async create(
    @Body() createPayableDto: CreatePayableDto,
  ): Promise<PayableDto> {
    return await this.payablesService.create(createPayableDto);
  }

  @Get()
  @ApiOkResponse({ type: [PayableDto] })
  async findAll(): Promise<PayableDto[]> {
    return await this.payablesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PayableEntity })
  async findOne(@Param('id') id: string): Promise<PayableDto> {
    return await this.payablesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PayableEntity })
  update(
    @Param('id') id: string,
    @Body() updatePayableDto: UpdatePayableDto,
  ): Promise<PayableDto> {
    return this.payablesService.update(id, updatePayableDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PayableEntity })
  async remove(@Param('id') id: string): Promise<{ statusCode: HttpStatus, message: string }> {
    return await this.payablesService.remove(id);
  }
}
