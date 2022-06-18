import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zen/prisma';
import { SecretsProvider } from '@zen/secrets-provider';

@Injectable()
export class AppService {
  constructor(
    private readonly secretsProvider: SecretsProvider,
    private readonly prisma: PrismaService,
  ) {}

  async getHello(): Promise<string> {
    const secret = await this.secretsProvider.getSecret('secret');
    const users = await this.prisma.user.findMany();

    if (!users.length) {
      await this.prisma.user.create({
        data: {
          email: 'captain@blackpearl.sea',
          name: 'Jack Sparrow',
        },
      });
    }

    console.log({ secret, users });
    return 'Hello World!';
  }
}
