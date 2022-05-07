import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DataVersionService } from '@zen/data-version';
import { InjectRepository } from '@zen/prisma';
import { Persona, Ship } from '../models';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaPrisma: Prisma.PersonaDelegate<any>,
    @InjectRepository(Ship)
    private readonly shipPrisma: Prisma.ShipDelegate<any>,
    private readonly dataver: DataVersionService,
  ) {}
  async createPersona(name: string) {
    const existing = await this.personaPrisma.findFirst({ where: { name } });

    if (!existing) {
      const result = await this.personaPrisma.create({ data: { name } });
      await this.dataver.createVersion(Persona, result);
      return result;
    }

    return existing;
  }

  async listPersonas() {
    const result = await this.personaPrisma.findMany();

    const versions = await Promise.all(
      result.map((x) => this.dataver.getVersions(Persona, x.id)),
    );

    return result.map((x) => ({
      ...x,
      versions: versions.find(([y]) => y.id === x.id),
    }));
  }

  async listShips() {
    const result = await this.shipPrisma.findMany();

    const versions = await Promise.all(
      result.map((x) => this.dataver.getVersions(Ship, x.id)),
    );

    return result.map((x) => ({
      ...x,
      versions: versions.find(([y]) => y.id === x.id),
    }));
  }

  async createShip(name: string) {
    const existing = await this.shipPrisma.findFirst({ where: { name } });

    if (!existing) {
      const result = await this.shipPrisma.create({ data: { name } });
      await this.dataver.createVersion(Ship, result);
      return result;
    }

    return existing;
  }
}
