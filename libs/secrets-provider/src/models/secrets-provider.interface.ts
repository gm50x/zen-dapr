export interface ISecretsProvider {
  getSecret(name: string): Promise<string>;
}
