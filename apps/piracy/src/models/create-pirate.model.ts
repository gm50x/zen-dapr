import { ApiProperty } from '@nestjs/swagger';

export class CreatePirate {
  @ApiProperty()
  name: string;
}
