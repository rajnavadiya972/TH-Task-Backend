import { faker } from "@faker-js/faker";
import { client } from "../src/config/database";
import { registerUserQuery } from "../database/queries/userQueries";
import bcrypt from "bcrypt";

const generateFakeUser = (length) => {
  const generateFakeUserModel = () => ({
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync("12345", 10),
  });

  const users = Array.from({ length: length }, generateFakeUserModel);

  users.forEach(async (user) => {
    const { firstname, lastname, email, password } = user;
    const query = {
      text: registerUserQuery,
      values: [firstname, lastname, email, password],
    };
    try {
      await client.query(query);
    } catch (err) {
      console.log(err);
    }
  });
};

export default {
  generateFakeUser,
};
