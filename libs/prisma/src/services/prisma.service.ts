import {
  INestApplication,
  Injectable,
  OnModuleInit,
  Provider,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class PrismaDatasourceUrl extends String {}

export const getDatasourceProvider = (url: string): Provider<string> => ({
  provide: PrismaDatasourceUrl,
  useValue: url,
});

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly datasourceUrl: PrismaDatasourceUrl) {
    super({ datasources: { db: { url: datasourceUrl as string } } });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
