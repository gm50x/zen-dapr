import { Injectable, Module } from '@nestjs/common';
import {
  PrismaModule,
  PrismaModuleOptions,
  PrismaOptionsFactory,
} from '@zen/prisma';
import { SecretsProvider, SecretsProviderModule } from '@zen/secrets-provider';
import { PublisherModule } from 'libs/publisher/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';

function CreatePrismaOptions(secretName: string): any {
  @Injectable()
  class CreatePrismaOptions implements PrismaOptionsFactory {
    constructor(private readonly secretsProvider: SecretsProvider) {}
    async createPrismaOptions(): Promise<PrismaModuleOptions> {
      return {
        url: await this.secretsProvider.getSecret(secretName),
      };
    }
  }

  return CreatePrismaOptions;
}

@Module({
  imports: [
    SecretsProviderModule,
    PublisherModule,
    PrismaModule.forRootAsync({
      imports: [SecretsProviderModule],
      useClass: CreatePrismaOptions('sandbox-database-url'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
