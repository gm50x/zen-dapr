import { Controller, Get } from '@nestjs/common';
import { SandboxService } from './sandbox.service';

@Controller()
export class SandboxController {
  constructor(private readonly sandboxService: SandboxService) {}

  @Get()
  getHello(): string {
    return this.sandboxService.getHello();
  }
}
