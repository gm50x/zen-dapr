import { Provider } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { DaprService } from '@zen/dapr';

export const PrismaProvider: Provider<Promise<PrismaService>> = {
  provide: PrismaService,
  inject: [DaprService],
  useFactory: async (dapr: DaprService) => {
    const url = await dapr.getSecret('piracy-database-url');
    return PrismaService.fromUrl(url);
  },
};
