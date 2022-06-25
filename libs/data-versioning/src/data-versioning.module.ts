import { Module } from '@nestjs/common';
import { StateProviderModule } from '@zen/state-provider';
import { DataVersioningService } from './services';

@Module({
  imports: [StateProviderModule],
  providers: [DataVersioningService],
  exports: [DataVersioningService],
})
export class DataVersioningModule {}
