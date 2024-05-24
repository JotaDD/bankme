import { Module } from '@nestjs/common';
import { AssignorsModule } from './assignors/assignors.module';
import { PayablesModule } from './payables/payables.module';

@Module({
  imports: [AssignorsModule, PayablesModule],
})
export class IntegrationsModule {}
