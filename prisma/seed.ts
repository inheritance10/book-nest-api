import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  for (let i = 1; i <= 100; i++) {
    await prisma.book.create({
      data: {
        title: `Book Title ${i}`,
        author: `Author ${i}`,
        publishedYear: 2000 + (i % 20),
        genre: i % 2 === 0 ? 'Fiction' : 'Non-Fiction',
        point: Math.random() * 5,
        userId: 1,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
