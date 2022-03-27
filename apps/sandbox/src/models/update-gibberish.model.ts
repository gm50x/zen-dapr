import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class UPdateGibberishInput implements Prisma.GibberishUpdateInput {
  @ApiProperty()
  value: string;
}
