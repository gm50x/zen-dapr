import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SandboxService } from '../services';

@Controller()
@ApiTags('Sandbox')
export class SandboxController {
  constructor(private readonly sandboxService: SandboxService) {}

  @Get()
  getHello(): string {
    return this.sandboxService.getHello();
  }

  @Get('/secrets')
  getSecret(): Promise<string> {
    return this.sandboxService.getSecret();
  }
}
