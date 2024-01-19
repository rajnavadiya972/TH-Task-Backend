const express = require("express");
require("dotenv").config();
const { client } = require("./src/config/database.js");
const { generateFakeUser } = require("./scripts/fakeUserGenerator.js");

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const startServer = async () => {
  try {
    await client.connect();

    generateFakeUser(50);

    app.listen(PORT, () => {
      console.log(`server Started at PORT : ${PORT}`);
    });
  } catch (error) {
    await client.end();
  }
};

startServer();

process.on("exit", async () => {
  await client.end();
});

process.on("SIGINT", async () => {
  await client.end();
});
