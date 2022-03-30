import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('gibberish')
@ApiTags('Gibberish')
export class FooController {
  @Post('foo')
  foo(@Body() data: any) {
    console.log('foo', data);
  }

  @Post('bar')
  bar(@Body() data: any) {
    console.log('bar', data);
  }
}
