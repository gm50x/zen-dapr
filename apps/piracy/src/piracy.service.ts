import { Injectable } from '@nestjs/common';

@Injectable()
export class PiracyService {
  getHello(): string {
    return 'Hello World!';
  }
}
