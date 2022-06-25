import { Injectable } from '@nestjs/common';
import { ISecretsProvider } from '../models';

@Injectable()
export abstract class SecretsProvider implements ISecretsProvider {
  abstract getSecret(name: string): Promise<string>;
}
