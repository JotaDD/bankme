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
  create(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorsService.create(createAssignorDto);
  }

  @Get()
  @ApiOkResponse({ isArray: true, type: AssignorEntity })
  findAll() {
    return this.assignorsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: AssignorEntity })
  findOne(@Param('id') id: string) {
    return this.assignorsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: AssignorEntity })
  update(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto,
  ) {
    return this.assignorsService.update(id, updateAssignorDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: AssignorEntity })
  remove(@Param('id') id: string) {
    return this.assignorsService.remove(id);
  }
}
