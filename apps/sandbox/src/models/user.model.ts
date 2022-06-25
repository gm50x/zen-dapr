import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User as Model } from '@prisma/client';

export class User implements Partial<Model> {
  @ApiPropertyOptional()
  id: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  name?: string;
}
