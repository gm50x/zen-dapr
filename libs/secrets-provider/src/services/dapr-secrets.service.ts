import { Injectable } from '@nestjs/common';
import { DaprService } from '@zen/dapr';
import { SecretsProvider } from './secrets-provider.abstract';

@Injectable()
export class DaprSecretsService extends SecretsProvider {
  constructor(private readonly dapr: DaprService) {
    super();
  }

  async getSecret(name: string): Promise<string> {
    return this.dapr.getSecret(name);
  }
}
