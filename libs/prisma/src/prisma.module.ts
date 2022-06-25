import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  PrismaModuleAsyncOptions,
  PrismaModuleOptions,
  PrismaOptionsFactory,
} from './interfaces';
import { PrismaService, PrismaDatasourceUrl } from './services';

@Module({})
export class PrismaModule {
  static forRoot({ url }: PrismaModuleOptions): DynamicModule {
    const dataSourceProvider: Provider<PrismaDatasourceUrl> = {
      provide: PrismaDatasourceUrl,
      useValue: url,
    };
    return {
      module: PrismaModule,
      providers: [dataSourceProvider, PrismaService],
      exports: [PrismaService],
    };
  }

  static forRootAsync({
    imports,
    useClass,
  }: PrismaModuleAsyncOptions): DynamicModule {
    const dataSourceProvider: Provider<Promise<PrismaDatasourceUrl>> = {
      provide: PrismaDatasourceUrl,
      inject: [useClass],
      useFactory: async (dataSourceFactory: PrismaOptionsFactory) => {
        const { url } = await dataSourceFactory.createPrismaOptions();
        return url;
      },
    };

    return {
      module: PrismaModule,
      imports,
      providers: [
        PrismaService,
        dataSourceProvider,
        { provide: useClass, useClass },
      ],
      exports: [PrismaService],
    };
  }
}
