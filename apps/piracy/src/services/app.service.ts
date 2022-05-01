import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { InjectRepository } from '@zen/prisma';
import { Persona, Ship } from '../models';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaPrisma: Prisma.PersonaDelegate<any>,
    @InjectRepository(Ship)
    private readonly shipPrisma: Prisma.ShipDelegate<any>,
  ) {}
  async createPersona(name: string) {
    const persona = await this.personaPrisma.findFirst({ where: { name } });

    if (!persona) {
      return this.personaPrisma.create({ data: { name } });
    }

    return persona;
  }

  async listPersonas() {
    return this.personaPrisma.findMany();
  }

  async listShips() {
    return this.shipPrisma.findMany();
  }

  async createShip(name: string) {
    const existing = await this.shipPrisma.findFirst({ where: { name } });

    if (!existing) {
      return this.shipPrisma.create({ data: { name } });
    }

    return existing;
  }
}
