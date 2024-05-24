import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma/prisma.module';
import { RouterModule } from '@nestjs/core';
import { routes } from './routes';
import { IntegrationsModule } from './integrations/integrations.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    PrismaModule,
    IntegrationsModule,
    RouterModule.register(routes),
    DatabaseModule,
  ],
})
export class AppModule {}
