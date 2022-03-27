import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DaprService } from '@zen/dapr';
import { PrismaService } from '../services';

const createPrismaService = async (
  config: ConfigService,
  dapr: DaprService,
) => {
  const app = config.get('APP_NAME').toUpperCase();
  const secretKey = `${app}_DATABASE_URL`;
  const url = await dapr.getSecret(secretKey);
  return new PrismaService({ datasources: { db: { url } } });
};

export const PrismaServiceProvider: Provider = {
  provide: PrismaService,
  useFactory: createPrismaService,
  inject: [ConfigService, DaprService],
};
