import { faker } from "@faker-js/faker";
import { User } from "../models/userModel.js";
import { Chat } from "../models/chatModel.js";

const createUser = async (numUsers) => {
  try {
    const usersPromise = [];

    for (let i = 0; i < numUsers; i++) {
      const temp = User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        password: "password",
        bio: faker.lorem.sentence(10),
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });

      usersPromise.push(temp);
    }

    await Promise.all(usersPromise);
    console.log("users created", numUsers);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};


export { createUser };
