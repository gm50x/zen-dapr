import { Injectable } from '@nestjs/common';
import { DaprService } from '@zen/dapr';

@Injectable()
export class SandboxService {
  constructor(private readonly dapr: DaprService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getSecret() {
    return this.dapr.getSecret('secret');
  }
}
