import pg from 'pg'
const { Client } = pg;

const { USER, HOST, PASSWORD, PORT, DATABASE } = process.env;

const configuration = {
  user: USER,
  host: HOST,
  password: PASSWORD,
  port: PORT,
  database: DATABASE,
};

const client = new Client(configuration);

export default client;
