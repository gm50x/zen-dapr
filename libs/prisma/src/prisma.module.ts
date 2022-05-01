import { DynamicModule, Module } from '@nestjs/common';
import { PrismaService } from './services';

const toCamelCase = (str) =>
  str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (Number(match) === 0) return '';
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {
  static forModel(
    ...models: Array<new (...args: Array<any>) => any>
  ): DynamicModule {
    return {
      module: PrismaModule,
      providers: models.map((x) => ({
        inject: [PrismaService],
        provide: x,
        useFactory: (prisma: PrismaService) => prisma[toCamelCase(x.name)],
      })),
      exports: [...models],
    };
  }

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
