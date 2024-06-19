import { Module } from '@nestjs/common';
import { PayablesService } from './payables.service';
import { PayablesController } from './payables.controller';
import { AssignorsService } from '../assignors/assignors.service';

@Module({
  controllers: [PayablesController],
  providers: [PayablesService, AssignorsService],
})
export class PayablesModule {}
