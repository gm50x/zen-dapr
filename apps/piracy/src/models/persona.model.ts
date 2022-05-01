import { Persona as Model } from '@prisma/client';

export class Persona implements Model {
  id: string;
  name: string;
}
