import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DaprService } from '@zen/dapr';

class Event {
  topic: string;
  data: any;
}

@Controller()
@ApiTags('Events')
export class EventsController {
  constructor(private readonly dapr: DaprService) {}

  @Post('publish')
  publish(@Body() _data: Event) {
    const { topic, data } = _data;
    console.log('publish', _data);
    this.dapr.publish(topic, data);
  }

  @Post('events/foo')
  foo(@Body() data: any) {
    console.log('foo', data);
  }
}
