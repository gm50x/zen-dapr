import { Controller, Get } from '@nestjs/common';
import { SandboxService } from '../services';

@Controller()
export class SandboxController {
  constructor(private readonly sandboxService: SandboxService) {}

  @Get()
  getHello(): string {
    return this.sandboxService.getHello();
  }
}
