import {
  applyDecorators,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Constructor } from '@zen/domain';

export function UseAspects(...args: Array<Constructor<NestInterceptor>>) {
  return applyDecorators(...args.map((x) => UseInterceptors(x)));
}
