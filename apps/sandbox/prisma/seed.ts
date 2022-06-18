import { PrismaClient } from '@prisma/client';

import { users } from './seeds';

const prisma = new PrismaClient();
async function main() {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Attempt to seed non development database');
  }

  await prisma.user.createMany({ data: users });
}

main()
  .catch((err) => {
    console.error(err.message);
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
