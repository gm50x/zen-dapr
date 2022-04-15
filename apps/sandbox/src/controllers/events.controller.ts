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

  @Post('foo')
  foo(@Body() data: any) {
    console.log('foo', data);
  }

  @Post('bar')
  bar(@Body() data: any) {
    console.log('bar', data);
  }

  @Post('fizz')
  fizz(@Body() data: any) {
    console.log('fizz', data);
  }

  @Post('events/buzz')
  buzz(@Body() data: any) {
    console.log('buzz', data);
  }

  @Post('events/bin')
  bin(@Body() data: any) {
    console.log('bin', data);
  }

  @Post('events/baz')
  baz(@Body() data: any) {
    console.log('baz', data);
  }

  @Post('events/bum')
  bum(@Body() data: any) {
    console.log('bum', data);
  }

  @Post('events/bummer')
  bummer(@Body() data: any) {
    console.log('bummer', data);
  }

  @Post('events/blum')
  blum(@Body() data: any) {
    console.log('blum', data);
  }
}
