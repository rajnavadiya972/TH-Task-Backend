const { faker } = require("@faker-js/faker");
const { client } = require("../src/config/database");
const { registerUserQuery } = require("../database/queries/userQueries");
const bcrypt = require("bcrypt");

const generateFakeUser = (length) => {
  const generateFakeUserModel = () => ({
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    // password: bcrypt.hashSync(faker.internet.password(), 10),
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

module.exports = {
  generateFakeUser,
};
