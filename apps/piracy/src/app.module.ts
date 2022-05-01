import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@zen/prisma';
import { Persona, Ship } from './models';
import { PersonasController, ShipsController } from './controllers';
import { AppService } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PrismaModule.forModel(Persona, Ship),
  ],
  controllers: [PersonasController, ShipsController],
  providers: [AppService],
})
export class PiracyModule {}
