import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DaprModule } from '@zen/dapr';
import { DaprSecretsService, SecretsProvider } from './services';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DaprModule],
  providers: [
    {
      provide: SecretsProvider,
      useClass: DaprSecretsService,
    },
  ],
  exports: [SecretsProvider],
})
export class SecretsProviderModule {}
