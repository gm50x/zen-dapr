import { Injectable } from '@nestjs/common';
import { DaprService } from '@zen/dapr';
import { ISecretsProvider } from '../models';
import { SecretsProvider } from './secrets-provider.abstract';

@Injectable()
export class DaprSecretsService
  extends SecretsProvider
  implements ISecretsProvider
{
  constructor(private readonly dapr: DaprService) {
    super();
  }

  async getSecret(name: string): Promise<string> {
    return this.dapr.getSecret(name);
  }
}
