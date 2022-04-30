import { Controller, Get } from '@nestjs/common';
import { PartnershipService } from './partnership.service';

@Controller()
export class PartnershipController {
  constructor(private readonly partnershipService: PartnershipService) {}

  @Get()
  getHello(): string {
    return this.partnershipService.getHello();
  }
}
