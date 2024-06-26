import { Routes } from '@nestjs/core';
import { AssignorsModule } from 'src/app/integrations/assignors/assignors.module';
import { IntegrationsModule } from 'src/app/integrations/integrations.module';
import { PayablesModule } from 'src/app/integrations/payables/payables.module';
import { AuthModule } from '../integrations/auth/auth.module';

export const routes: Routes = [
  {
    path: '/integrations',
    module: IntegrationsModule,
    children: [
      {
        path: '/auth',
        module: AuthModule,
      },
      {
        path: '/payables',
        module: PayablesModule,
      },
      {
        path: '/assignors',
        module: AssignorsModule,
      },
    ],
  },
];
