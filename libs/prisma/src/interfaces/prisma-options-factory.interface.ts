import { PrismaModuleOptions } from './prisma-module-options.interface';

export interface PrismaOptionsFactory {
  createPrismaOptions(): Promise<PrismaModuleOptions> | PrismaModuleOptions;
}
