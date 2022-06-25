import { ModuleMetadata, Type } from '@nestjs/common';
import { PrismaOptionsFactory } from './prisma-options-factory.interface';

export interface PrismaModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useClass: Type<PrismaOptionsFactory>;
}
