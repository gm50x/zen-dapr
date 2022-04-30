import { Module } from '@nestjs/common';
import { PartnershipController } from './partnership.controller';
import { PartnershipService } from './partnership.service';

@Module({
  imports: [],
  controllers: [PartnershipController],
  providers: [PartnershipService],
})
export class PartnershipModule {}
