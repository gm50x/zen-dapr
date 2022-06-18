import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zen/prisma';
import { SecretsProvider } from '@zen/secrets-provider';
import { Publisher } from 'libs/publisher/src';

@Injectable()
export class AppService {
  constructor(
    private readonly secretsProvider: SecretsProvider,
    private readonly publisher: Publisher,
    private readonly prisma: PrismaService,
  ) {}

  async getHello(): Promise<string> {
    const secret = await this.secretsProvider.getSecret('secret');
    const users = await this.prisma.user.findMany();

    const published = await this.publisher.publish('foo', { bar: 'foo' });

    if (!users.length) {
      await this.prisma.user.create({
        data: {
          email: 'captain@blackpearl.sea',
          name: 'Jack Sparrow',
        },
      });
    }

    console.log({ secret, users, published });
    return 'Hello World!';
  }
}
