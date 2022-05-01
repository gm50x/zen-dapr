import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { InjectRepository } from '@zen/prisma';
import { Persona } from '../models';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaPrisma: Prisma.PersonaDelegate<any>,
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
}
