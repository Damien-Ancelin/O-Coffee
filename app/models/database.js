import pg from "pg";

const { Client } = pg;

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

await client
  .connect()
  .then(console.log("BDD Connecté"))
  .catch((error) => console.error(`error survenue: ${error}`));

export default client;
