import express from "express";
import dotenv from "dotenv";
import client from "./src/config/database.js";
import userRoute from "./src/routes/user.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const startServer = async () => {
  try {
    await client.connect();

    app.use("/user", userRoute);

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
