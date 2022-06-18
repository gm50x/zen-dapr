import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { DavrService } from '../services';
import { IAspect } from './aspect.interface';

type Constructor<T> = new (...args: any) => T;

export function UseAspectInterceptor<T>(
  Aspect: Constructor<T>,
): Constructor<NestInterceptor> {
  class Interceptor implements NestInterceptor {
    constructor(
      @Inject(Aspect)
      private readonly aspect: IAspect,
    ) {}
    async intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Promise<Observable<any>> {
      const request = context.switchToHttp().getRequest<Request>();

      return next.handle().pipe(
        tap(async (result) => {
          await this.aspect.execute(request, result);
        }),
      );
    }
  }

  return Interceptor;
}

// Aspect -> Does not change the output
// MutatingAspect -> Changes the output

// export class AspectOfVersioning implements IAspect {
//   execute(input: Request, output: any) {
//     console.log('hello world!');
//   }
// }

export function AspectOfVersioning<T>(
  model: new (...args) => T,
): new (...args: any) => NestInterceptor {
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
