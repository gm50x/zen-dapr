import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';
import { DataVersioningService } from '../services';

export function CreateDataVersion<T extends { id: string | number }>(
  model: Type<T>,
): Type<NestInterceptor> {
  @Injectable()
  class CreateDataVersion implements NestInterceptor {
    constructor(private readonly dataVersioning: DataVersioningService) {}
    intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
      // TODO: Must create an abstraction to include GraphQL
      // not worried about RPC for the moment
      const { method, headers } = context.switchToHttp().getRequest<Request>();
      if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
        return next.handle();
      }

      return next.handle().pipe(
        tap(async (data: T) => {
          // TODO: Determine user from request.headers.authorization...
          // We are using JWT, but it might become ApiKeys in near future too
          const { authorization } = headers;
          await this.dataVersioning.createVersion(
            model,
            data,
            authorization || 'unknown',
          );
        }),
      );
    }
  }
  return CreateDataVersion;
}
