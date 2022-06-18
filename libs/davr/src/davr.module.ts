import { Module } from '@nestjs/common';
import { DaprModule } from '@zen/dapr';
import { DavrService } from './services';

@Module({
  imports: [DaprModule],
  providers: [DavrService],
  exports: [DavrService],
})
export class DavrModule {}
