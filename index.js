const express = require("express");
require("dotenv").config();
const { client } = require("./src/config/database");
const { errorHandler } = require("./src/middlewares/errorHandler");
const userRoute = require("./src/routes/user");

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const startServer = async () => {
  try {
    await client.connect();

    app.use("/user", userRoute);

    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`server Started at PORT : ${PORT}`);
    });
  } catch (error) {
    console.log(error);
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
