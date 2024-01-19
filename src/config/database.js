const { Client } = require("pg");

const { USER, HOST, PASSWORD, PORT, DATABASE } = process.env;

const configuration = {
  user: USER,
  host: HOST,
  password: PASSWORD,
  port: PORT,
  database: DATABASE,
};

const client = new Client(configuration);

module.exports = {
  client,
};
