import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zen/prisma';
import { SecretsProvider } from '@zen/secrets-provider';
import { Publisher } from '@zen/publisher';
import { StateProvider } from '@zen/state-provider';
import { User } from './models';

@Injectable()
export class AppService {
  constructor(
    private readonly secretsProvider: SecretsProvider,
    private readonly publisher: Publisher,
    private readonly stateProvider: StateProvider,
    private readonly prisma: PrismaService,
  ) {}

  async createUser(data: User): Promise<any> {
    await this.stateProvider.save({ ...data, id: 1 });
    const saved = await this.stateProvider.get<User>(1);
    const all = await this.stateProvider.getMany<User>();
    const hector = await this.stateProvider.getMany<User>({
      email: ['hector.barbossa@piracy.sea', 'jack.sparrow@piracy.sea'],
      name: 'Hector Barbossa',
    });
    console.log({ data, saved, all, hector });
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
