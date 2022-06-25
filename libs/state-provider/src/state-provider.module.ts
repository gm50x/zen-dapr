import { Module } from '@nestjs/common';
import { DaprModule } from '@zen/dapr';
import { StateProvider, DaprStateService } from './services';

@Module({
  imports: [DaprModule],
  providers: [
    {
      provide: StateProvider,
      useClass: DaprStateService,
    },
  ],
  exports: [StateProvider],
})
export class StateProviderModule {}
