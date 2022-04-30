import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DaprModule } from '@zen/dapr';
import { PrismaModule } from '@zen/prisma';

import {
  SandboxController,
  GibberishController,
  EventsController,
} from './controllers';
import { GibberishRepository } from './repositories';
import { GibberishService, SandboxService } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PrismaModule.forRepository(GibberishRepository),
    DaprModule,
    DaprModule.subscribe(['foo', 'events/foo']),
  ],
  controllers: [SandboxController, GibberishController, EventsController],
  providers: [SandboxService, GibberishService],
})
export class AppModule {}
