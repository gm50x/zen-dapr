import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '@zen/health';
import { DaprModule } from '@zen/dapr';
import { PrismaModule } from '@zen/prisma';

import {
  SandboxController,
  GibberishController,
  EventsController,
} from './controllers';
import { GibberishService, SandboxService } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    PrismaModule,
    DaprModule,
    DaprModule.subscribe(['foo', 'events/foo']),
  ],
  controllers: [SandboxController, GibberishController, EventsController],
  providers: [SandboxService, GibberishService],
})
export class AppModule {}
