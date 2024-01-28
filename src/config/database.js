import pg from "pg";
import dotenv from "dotenv"

const { Client } = pg;
dotenv.config();

const { USER, HOST, PASSWORD, PORT, DATABASE } = process.env;

const configuration = {
  user: USER,
  host: HOST,
  password: PASSWORD,
  port: PORT,
  database: DATABASE,
};

const client = new Client(configuration);
// console.log(client);

export default client;
