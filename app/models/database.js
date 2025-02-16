import pg from "pg";

const { Client } = pg;

const connectionString = process.env.PG_URL;
const client = new Client({ connectionString });

await client
  .connect()
  .then(console.log("BDD Connecté"))
  .catch((error) => console.error(`error survenue: ${error}`));

export default client;
