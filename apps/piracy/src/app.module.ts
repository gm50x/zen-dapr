import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@zen/prisma';
import { PersonasController, ShipsController } from './controllers';
import { AppService } from './services';
import { DavrModule } from '@zen/davr';
import { DaprModule } from '@zen/dapr';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    DaprModule,
    DaprModule.subscribe('foo', 'bar'),
    DaprModule.subscribe('fizz'),
    DavrModule,
  ],
  controllers: [PersonasController, ShipsController],
  providers: [AppService],
})
export class PiracyModule {}
