import { Module } from '@nestjs/common';
import { DaprModule } from '@zen/dapr';
import { DaprPublisher, Publisher } from './services';

@Module({
  imports: [DaprModule],
  providers: [
    {
      provide: Publisher,
      useClass: DaprPublisher,
    },
  ],
  exports: [Publisher],
})
export class PublisherModule {}
