// Usage: yarn prisma db seed --preview-feature
import { PrismaClient } from '@prisma/client';
import { payables, assignors, user } from './seeds';

const prisma = new PrismaClient();

async function main() {
  // Seed assignors
  for (const assignor of assignors) {
    await prisma.assignor.create({
      data: assignor,
    });
  }
  // Seed payables
  for (const payable of payables) {
    await prisma.payable.create({
      data: payable,
    });
  }

  //Seed user
  await prisma.user.create({
    data: user,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
