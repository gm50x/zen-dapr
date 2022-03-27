import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DaprModule } from '@zen/dapr';

import { PrismaService } from './services';
import { PrismaServiceProvider } from './providers';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DaprModule],
  providers: [PrismaServiceProvider],
  exports: [PrismaService],
})
export class PrismaModule {}
