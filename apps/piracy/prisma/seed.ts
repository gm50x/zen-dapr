import { PrismaClient } from '@prisma/client';

/** IMPORT YOUR SEEDS */
// import { gibberish } from './seeds';

const prisma = new PrismaClient();
async function main() {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Attempt to seed non development database');
  }

  /** RUN YOUR SEEDS AS NEEDED */
  console.log('nothing to seed');
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
