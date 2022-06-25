import { Prisma } from '@prisma/client';

export const users: Array<Prisma.UserCreateInput> = [
  { email: 'john@doe.com', name: 'John Doe' },
  { email: 'jane@doe.com', name: 'Jane Doe' },
];
