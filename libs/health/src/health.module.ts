import { Module } from '@nestjs/common';
import { CreateHealthCheckController } from './controllers';
import { HealthCheckService } from './services';

@Module({
  controllers: [CreateHealthCheckController()],
  providers: [HealthCheckService],
  exports: [HealthCheckService],
})
export class HealthModule {}
