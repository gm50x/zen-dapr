import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Attempt to seed non development database');
  }

  // await prisma.gibberish.createMany({
  //   data: gibberish,
  // });
}

main()
  .catch((err) => {
    console.error(err.message);
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
