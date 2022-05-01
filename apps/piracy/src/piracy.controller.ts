import { Controller, Get } from '@nestjs/common';
import { PiracyService } from './piracy.service';

@Controller()
export class PiracyController {
  constructor(private readonly piracyService: PiracyService) {}

  @Get()
  getHello(): string {
    return this.piracyService.getHello();
  }
}
