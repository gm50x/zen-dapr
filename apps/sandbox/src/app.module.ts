import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DaprModule } from '@zen/dapr';
import { PrismaModule } from '@zen/prisma';

import {
  SandboxController,
  GibberishController,
  EventsController,
  HealthController,
} from './controllers';
import { GibberishService, SandboxService } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    DaprModule,
    DaprModule.subscribe('foo', 'bar'),
    DaprModule.subscribe('fizz'),
    DaprModule.subscribe(['buzz', 'events/buzz']),
    DaprModule.subscribe(['bin', 'events/bin'], ['baz', 'events/baz']),
    DaprModule.subscribe(
      { topic: 'bum', route: 'bum' },
      ['bummer', 'events/bummer'],
      'blum',
    ),
  ],
  controllers: [
    SandboxController,
    GibberishController,
    EventsController,
    HealthController,
  ],
  providers: [SandboxService, GibberishService],
})
export class AppModule {}
