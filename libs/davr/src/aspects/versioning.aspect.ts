import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { DavrService } from '../services';
import { Constructor } from '@zen/domain';

export function AspectOfVersioning<T>(
  model: Constructor<T>,
): Constructor<NestInterceptor> {
  @Injectable()
  class AspectOfVersioning implements NestInterceptor {
    constructor(private readonly davr: DavrService) {}

    async intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Promise<Observable<any>> {
      const timer = Date.now();
      return next.handle().pipe(
        tap(async (data) => {
          const prom = new Promise<string>((resolve) =>
            setTimeout(() => resolve('deu bom'), 10000),
          );

          await prom;

          const now = Date.now();
          console.log(model, data, prom, timer, now, now - timer);
        }),
      );
    }
  }

  return AspectOfVersioning;
}

export const UseAspectOfVersioning = <T>(model: new (...args) => T) =>
  UseInterceptors(AspectOfVersioning(model));
