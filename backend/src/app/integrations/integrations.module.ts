import { Module } from '@nestjs/common';
import { AssignorsModule } from './assignors/assignors.module';
import { AuthModule } from './auth/auth.module';
import { PayablesModule } from './payables/payables.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AssignorsModule, PayablesModule, UserModule, AuthModule],
})
export class IntegrationsModule {}
