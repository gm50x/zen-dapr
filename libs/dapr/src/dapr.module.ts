import { Module } from '@nestjs/common';
import { DaprService } from './dapr.service';

@Module({
  providers: [DaprService],
  exports: [DaprService],
})
export class DaprModule {}
