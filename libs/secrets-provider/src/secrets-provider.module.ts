import { Module } from '@nestjs/common';
import { DaprModule } from '@zen/dapr';
import { DaprSecretsService, SecretsProvider } from './services';

@Module({
  imports: [DaprModule],
  providers: [
    {
      provide: SecretsProvider,
      useClass: DaprSecretsService,
    },
  ],
  exports: [SecretsProvider],
})
export class SecretsProviderModule {}
