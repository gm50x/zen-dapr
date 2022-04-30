import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class UpdateGibberishInput implements Prisma.GibberishUpdateInput {
  @ApiProperty()
  value: string;
}
