import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DaprModule } from '@zen/dapr';
import { PrismaModule } from '@zen/prisma';

import { SandboxController, GibberishController } from './controllers';
import { GibberishService, SandboxService } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    DaprModule,
    DaprModule.subscribe(['foo', 'bar']),
  ],
  controllers: [SandboxController, GibberishController],
  providers: [SandboxService, GibberishService],
})
export class AppModule {}
