import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@zen/prisma';
import { Persona, Ship } from './models';
import { PersonasController, ShipsController } from './controllers';
import { AppService } from './services';
import { DataVersionModule } from '@zen/data-version';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PrismaModule.forModel(Persona, Ship),
    DataVersionModule,
  ],
  controllers: [PersonasController, ShipsController],
  providers: [AppService],
})
export class PiracyModule {}
