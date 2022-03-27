import { Prisma } from '@prisma/client';

export const gibberish: Array<Prisma.GibberishCreateInput> = [
  { value: 'foo' },
  { value: 'bar' },
  { value: 'fizz' },
  { value: 'buzz' },
];
