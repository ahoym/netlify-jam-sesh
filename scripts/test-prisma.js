const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // const response = await prisma.user.findMany();
    const response = await prisma.user.findOne({
      where: {
        subId: 'insert_auth0_sub_id_here',
      },
    });

    console.log('Prisma request succeeded', response);
    return response;
  } catch (error) {
    console.log('Prisma request failed. Caught error', e);
    return e;
  }
}

main().finally(async () => {
  await prisma.disconnect();
});
