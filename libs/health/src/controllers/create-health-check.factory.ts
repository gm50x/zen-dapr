import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheckService, IHealthCheck } from '../services';

export interface IHealthCheckController {
  check(): Promise<string>;
}

export function CreateHealthCheckController<T = HealthCheckService>(
  classRef?: T,
): new (...args: Array<any>) => IHealthCheckController {
  @Controller('health-check')
  @ApiTags('Health Check')
  class HealthCheckController implements IHealthCheckController {
    constructor(
      @Inject(classRef || HealthCheckService)
      private readonly service: IHealthCheck,
    ) {}

    @Get()
    async check(): Promise<string> {
      await this.service.check();
      return 'ok';
    }
  }

  return HealthCheckController;
}
