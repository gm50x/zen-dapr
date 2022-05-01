import { Ship as Model } from '@prisma/client';

export class Ship implements Model {
  id: string;
  name: string;
}
