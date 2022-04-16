import { Injectable } from '@nestjs/common';

export interface IHealthCheck {
  check(): Promise<void>;
}

@Injectable()
export class HealthCheckService implements IHealthCheck {
  async check() {
    return Promise.resolve();
  }
}
