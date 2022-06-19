import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zen/prisma';
import { SecretsProvider } from '@zen/secrets-provider';
import { Publisher } from '@zen/publisher';
import { StateProvider } from '@zen/state-provider';
import { User } from './models';
import { DataVersioningService } from 'libs/data-versioning/src/services';

@Injectable()
export class AppService {
  constructor(
    private readonly secretsProvider: SecretsProvider,
    private readonly publisher: Publisher,
    private readonly stateProvider: StateProvider,
    private readonly prisma: PrismaService,
    private readonly dataVersioning: DataVersioningService,
  ) {}

  async createUser(data: User): Promise<any> {
    const { email, name } = data;
    const saved = await this.prisma.user.create({
      data: { name, email },
    });
    await this.dataVersioning.createVersion(User, saved, 'doe');
    return saved;
  }

  async getUsers(): Promise<any> {
    const users = await this.prisma.user.findMany();

    const versions = await this.dataVersioning.getVersions(
      User,
      ...users.map((x) => x.id.toString()),
    );

    console.log(versions);

    return versions;
  }

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
