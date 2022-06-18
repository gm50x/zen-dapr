import { Injectable } from '@nestjs/common';
import { DaprService } from '@zen/dapr';
import { Publisher } from './publisher.abstract';

@Injectable()
export class DaprPublisher extends Publisher {
  constructor(private readonly dapr: DaprService) {
    super();
  }

  async publish<T>(topic: string, data: T): Promise<boolean> {
    return this.dapr.publish(topic, data);
  }
}
