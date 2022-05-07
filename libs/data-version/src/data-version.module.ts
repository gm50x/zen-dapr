import { Module } from '@nestjs/common';
import { DaprModule } from '@zen/dapr';
import { DataVersionService } from './services';

@Module({
  imports: [DaprModule],
  providers: [DataVersionService],
  exports: [DataVersionService],
})
export class DataVersionModule {}
