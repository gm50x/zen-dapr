import { Injectable } from '@nestjs/common';

@Injectable()
export class PartnershipService {
  getHello(): string {
    return 'Hello World!';
  }
}
