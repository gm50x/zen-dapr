import {
  applyDecorators,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DaprService } from '@zen/dapr';
import { Observable, tap } from 'rxjs';
import { CreatePirate } from '../models';
import { AppService } from '../services';

const UseAspects = () =>
  applyDecorators(
    UseInterceptors(FirstInterceptor),
    UseInterceptors(SecondInterceptor),
  );

@Injectable()
class FirstInterceptor implements NestInterceptor {
  constructor(private readonly dapr: DaprService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log(this.constructor.name, 'before...');

    this.dapr
      .getSecret('secret')
      .then((s) => console.log(this.constructor.name, 'secret', s));

    return next
      .handle()
      .pipe(
        tap((data) => console.log(this.constructor.name, 'after', { data })),
      );
  }
}

@Injectable()
class SecondInterceptor implements NestInterceptor {
  constructor(private readonly dapr: DaprService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log(this.constructor.name, 'before...');

    this.dapr
      .getSecret('secret')
      .then((s) => console.log(this.constructor.name, 'secret', s));

    return next
      .handle()
      .pipe(
        tap((data) => console.log(this.constructor.name, 'after', { data })),
      );
  }
}

@Controller('personas')
@ApiTags('Personas')
export class PersonasController {
  constructor(private readonly service: AppService) {}

  @Post()
  async create(@Body() dto: CreatePirate) {
    const { name } = dto;
    return this.service.createPersona(name);
  }

  @Get()
  @UseAspects()
  async list() {
    return this.service.listPersonas();
  }
}
