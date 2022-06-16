import { Injectable } from '@nestjs/common';
import { DataVersionService } from '@zen/data-version';
import { PrismaService } from '@zen/prisma';
import { Persona, Ship } from '../models';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dataver: DataVersionService,
  ) {
    setTimeout(async () => {
      const r = await this.prisma.persona.findMany();
      console.log(r);
    }, 2000);
  }
  async createPersona(name: string) {
    const existing = await this.prisma.persona.findFirst({ where: { name } });

    if (!existing) {
      const result = await this.prisma.persona.create({ data: { name } });
      await this.dataver.createVersion(Persona, result);
      return result;
    }

    return existing;
  }

  async listPersonas() {
    const result = await this.prisma.persona.findMany();

    const versions = await Promise.all(
      result.map((x) => this.dataver.getVersions(Persona, x.id)),
    );

    return result;
    // return result.map((x) => ({
    //   ...x,
    //   versions: versions.find(([y]) => y.id === x.id),
    // }));
  }

  async listShips() {
    const result = await this.prisma.ship.findMany();

    const versions = await Promise.all(
      result.map((x) => this.dataver.getVersions(Ship, x.id)),
    );

    return result.map((x) => ({
      ...x,
      versions: versions.find(([y]) => y.id === x.id),
    }));
  }

  async createShip(name: string) {
    const existing = await this.prisma.ship.findFirst({ where: { name } });

    if (!existing) {
      const result = await this.prisma.ship.create({ data: { name } });
      await this.dataver.createVersion(Ship, result);
      return result;
    }

    return existing;
  }
}
