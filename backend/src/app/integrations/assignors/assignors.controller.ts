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
import { Assignor } from 'src/interfaces';
import { AssignorsService } from './assignors.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { AssignorEntity } from './entities/assignor.entity';

@Controller()
@ApiTags('Assignors')
export class AssignorsController {
  constructor(private readonly assignorsService: AssignorsService) {}

  @Post()
  @ApiCreatedResponse({ status: 201, type: AssignorEntity })
  async create(
    @Body() createAssignorDto: CreateAssignorDto,
  ): Promise<Assignor> {
    return this.assignorsService.create(createAssignorDto);
  }

  @Get()
  @ApiOkResponse({ isArray: true, type: AssignorEntity })
  async findAll(): Promise<Assignor[]> {
    return this.assignorsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: AssignorEntity })
  async findOne(@Param('id') id: string): Promise<Assignor> {
    return this.assignorsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: AssignorEntity })
  async update(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto,
  ): Promise<Assignor> {
    return this.assignorsService.update(id, updateAssignorDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: AssignorEntity })
  async remove(@Param('id') id: string): Promise<Assignor> {
    return this.assignorsService.remove(id);
  }
}
