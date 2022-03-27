import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@zen/prisma';

@Injectable()
export class GibberishService {
  constructor(private readonly prisma: PrismaService) {}

  get(where: Prisma.GibberishWhereUniqueInput) {
    return this.prisma.gibberish.findUnique({ where });
  }

  getMany(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.GibberishWhereUniqueInput;
    where?: Prisma.GibberishWhereInput;
    orderBy?: Prisma.GibberishOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params || {};
    return this.prisma.gibberish.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  create(data: Prisma.GibberishCreateInput) {
    return this.prisma.gibberish.create({ data });
  }

  update(params: {
    where: Prisma.GibberishWhereUniqueInput;
    data: Prisma.GibberishUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.gibberish.update({ where, data });
  }

  delete(where: Prisma.GibberishWhereUniqueInput) {
    return this.prisma.gibberish.delete({ where });
  }
}
