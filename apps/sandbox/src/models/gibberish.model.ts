import { ApiProperty } from '@nestjs/swagger';
import { Gibberish as Model } from '@prisma/client';
export class Gibberish implements Model {
  @ApiProperty()
  id: string;

  @ApiProperty()
  value: string;
}
