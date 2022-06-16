import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@zen/prisma';
import { PersonasController, ShipsController } from './controllers';
import { AppService } from './services';
import { DataVersionModule } from '@zen/data-version';
import { DaprModule } from '@zen/dapr';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    DaprModule,
    DaprModule.subscribe('foo', 'bar'),
    DaprModule.subscribe('fizz'),
    DataVersionModule,
  ],
  controllers: [PersonasController, ShipsController],
  providers: [AppService],
})
export class PiracyModule {}
