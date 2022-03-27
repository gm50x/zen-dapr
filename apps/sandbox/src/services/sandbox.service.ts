import { Injectable } from '@nestjs/common';

@Injectable()
export class SandboxService {
  getHello(): string {
    return 'Hello World!';
  }
}
