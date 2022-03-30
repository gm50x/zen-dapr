import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DaprModule } from '@zen/dapr';

import { PrismaService } from './services';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DaprModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
