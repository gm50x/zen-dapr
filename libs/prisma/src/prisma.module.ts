import { DynamicModule, Module } from '@nestjs/common';
import { PrismaService } from './services';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {
  static forRepository(...repos: Array<any>): DynamicModule {
    return {
      module: PrismaModule,
      providers: repos.map((repository) => ({
        provide: repository,
        useFactory: (prisma: PrismaService) =>
          prisma[(repository as any).getModelName()],
        inject: [PrismaService],
      })),
      exports: repos,
    };
  }
}
