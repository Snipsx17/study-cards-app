import { PrismaClient } from "@prisma/client";
const readLine = require("node:readline");

const clientDB = new PrismaClient();

const usersData = require("./initData.json");
const main = async () => {
  const confirmation = await confirmReset(
    "Are you sure you want to reset entire DB? (Y/N)",
  );

  if (!confirmation) {
    console.log("Operation cancelled.");
    process.exit();
  }

  try {
    // delete all in DB
    await deleteAllRegisters();

    // add users and groups
    await AddDefaultDbData();
  } catch (error) {
    console.error("Error executing script:", error);
    process.exit(1);
  }
};

async function deleteAllRegisters() {
  const cardsDeleted = await clientDB.card.deleteMany({});
  console.log(`${cardsDeleted.count} cards where deleted.`);

  const groupsDeleted = await clientDB.group.deleteMany({});
  console.log(`${groupsDeleted.count} groups where deleted.`);

  const usersDeleted = await clientDB.user.deleteMany({});
  console.log(`${usersDeleted.count} users where deleted.`);
}

async function AddDefaultDbData() {
  await usersData.map(async (user: any) => {
    await clientDB.user.create({
      data: {
        name: user.name,
        username: user.username,
        password: user.password,
        avatar_url: user.avatar_url,
        group: {
          create: [
            {
              name: user.cardsGroup.group1,
            },
            {
              name: user.cardsGroup.group1,
            },
          ],
        },
      },
    });
  });

  const users = await clientDB.user.findMany({ include: { group: true } });

  for (const user of users) {
    const groupIds = user.group.map((group) => group.id);

    for (let i = 0; i < 10; i++) {
      await clientDB.card.create({
        data: {
          question: `Question ${i + 1} for ${user.name}`,
          response: `Response ${i + 1} for ${user.name}`,
          owner: {
            connect: { id: user.id },
          },
          group: {
            connect: { id: groupIds[i % groupIds.length] },
          },
        },
      });
    }
  }

  console.log("Database populated successfully!");
}

async function confirmReset(question: string) {
  return new Promise((resolve, reject) => {
    const interf = readLine.Interface({
      input: process.stdin,
      output: process.stdout,
    });

    interf.question(question, (response: string) => {
      interf.close();
      resolve(response.toLowerCase() === "y");
    });
  });
}

main();
