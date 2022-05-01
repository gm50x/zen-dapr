import { Module } from '@nestjs/common';
import { PiracyController } from './piracy.controller';
import { PiracyService } from './piracy.service';

@Module({
  imports: [],
  controllers: [PiracyController],
  providers: [PiracyService],
})
export class PiracyModule {}
