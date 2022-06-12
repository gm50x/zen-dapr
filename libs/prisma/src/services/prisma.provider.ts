import { DaprService } from '@zen/dapr';
import { PrismaService } from './prisma.service';

export const PrismaProvider = {
  provide: PrismaService,
  inject: [DaprService],
  useFactory: async (dapr: DaprService) => {
    const url = await dapr.getSecret('piracy-database-url');
    return PrismaService.fromUrl(url);
  },
};
