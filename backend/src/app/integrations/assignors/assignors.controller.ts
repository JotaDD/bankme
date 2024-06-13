import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AssignorsService } from './assignors.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { AssignorEntity } from './entities/assignor.entity';

@Controller()
@UseGuards(JwtAuthGuard)
@ApiTags('Assignors')
export class AssignorsController {
  constructor(private readonly assignorsService: AssignorsService) {}

  @Post()
  @ApiCreatedResponse({ status: 201, type: AssignorEntity })
  async create(
    @Body() createAssignorDto: CreateAssignorDto,
  ): Promise<CreateAssignorDto> {
    return await this.assignorsService.create(createAssignorDto);
  }

  @Get()
  @ApiOkResponse({ isArray: true, type: AssignorEntity })
  async findAll(): Promise<CreateAssignorDto[]> {
    return await this.assignorsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: AssignorEntity })
  async findOne(@Param('id') id: string): Promise<CreateAssignorDto> {
    return await this.assignorsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: AssignorEntity })
  async update(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto,
  ): Promise<CreateAssignorDto> {
    return await this.assignorsService.update(id, updateAssignorDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: AssignorEntity })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.assignorsService.remove(id);
  }
}
