import { Injectable } from '@nestjs/common';
import { SecretsProvider } from '@zen/secrets-provider';

@Injectable()
export class AppService {
  constructor(private readonly secretsProvider: SecretsProvider) {}

  async getHello(): Promise<string> {
    const secret = await this.secretsProvider.getSecret('foo');

    console.log({ secret });
    return 'Hello World!';
  }
}
