import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateGibberishInput implements Prisma.GibberishCreateInput {
  @ApiProperty()
  value: string;
}
