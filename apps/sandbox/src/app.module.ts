import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DaprModule } from '@zen/dapr';
import { PrismaModule } from '@zen/prisma';

import {
  SandboxController,
  GibberishController,
  FooController,
} from './controllers';
import { GibberishService, SandboxService } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    DaprModule,
    DaprModule.subscribe('foo', 'bar', 'fizz'),
    DaprModule.subscribe('buzz'),
  ],
  controllers: [SandboxController, GibberishController, FooController],
  providers: [SandboxService, GibberishService],
})
export class AppModule {}
