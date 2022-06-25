import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';
import { DataVersioningService } from '../services';

export function IncludeDataVersions<T extends { id: string | number }>(
  model: Type<T>,
): Type<NestInterceptor> {
  @Injectable()
  class IncludeDataVersions implements NestInterceptor {
    constructor(private readonly dataVersioning: DataVersioningService) {}
    intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
      const { method, query } = context.switchToHttp().getRequest<Request>();
      if (!(method === 'GET' && query.includeVersions === 'true')) {
        return next.handle();
      }

      // TODO: Will require pagination adjustments once we have pagination
      return next.handle().pipe(
        map(async (data: T) => {
          const isMultipleDataEntry = Array.isArray(data);
          const versions = await this.dataVersioning.getVersions(
            model,
            ...(isMultipleDataEntry
              ? data.map((x) => x.id.toString())
              : [(data as any).id?.toString()]),
          );

          if (!isMultipleDataEntry) {
            return { ...data, versions };
          }

          return data.map((x) => ({
            ...x,
            versions: versions.filter((versionElm) => versionElm.id == x.id),
          }));
        }),
      );
    }
  }

  return IncludeDataVersions;
}
