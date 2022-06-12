import { Module } from '@nestjs/common';
import { DaprModule } from '@zen/dapr';
import { PrismaService } from './services';
import { PrismaProvider } from './services/prisma.provider';

@Module({
  imports: [DaprModule],
  providers: [PrismaProvider],
  exports: [PrismaService],
})
export class PrismaModule {}
