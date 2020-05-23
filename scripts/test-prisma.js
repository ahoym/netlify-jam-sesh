const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // const response = await prisma.user.findMany();
    const response = await prisma.user.findOne({
      where: {
        subId: 'github|5249615',
      },
    });
    console.log(response);
    return response;
  } catch (e) {
    console.log('catching');
    console.log(e);
    return e;
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.disconnect();
  });
