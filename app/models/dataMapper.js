import client from "./database.js";

export const dataMapper = {
  async getAllCoffee() {
    const queryAllCoffee = {
      text: `SELECT "coffee"."id", "coffee"."name", "coffee"."reference", "coffee"."description", "origin"."name" AS "origin", "flavor"."name" AS "flavor" FROM "coffee"
         JOIN "origin" ON ("coffee"."origin_id" = "origin"."id")
         JOIN "flavor" ON ("coffee"."flavor_id" = "flavor"."id")
         ORDER BY "id";`,
    };
    const result = await client.query(queryAllCoffee);
    return result.rows;
  },

  async findOneCoffee(idCoffee) {
    const queryOneCoffee = {
      text: `SELECT "coffee"."id", "coffee"."name", "coffee"."reference", "coffee"."description", "origin"."name" AS "origin", "flavor"."name" AS "flavor" FROM "coffee"
         JOIN "origin" ON ("coffee"."origin_id" = "origin"."id")
         JOIN "flavor" ON ("coffee"."flavor_id" = "flavor"."id")
         WHERE "coffee"."id" = $1;`,
      values: [idCoffee],
    };
    const result = await client.query(queryOneCoffee);
    return result.rows[0];
  },

  async findThirdLastProduct() {
    const query = {
      text: `SELECT "id", "name", "reference", "description" FROM "coffee"
            ORDER BY "id" DESC LIMIT 3;`,
    };
    const result = await client.query(query);
    return result.rows;
  },

  async findFlavors() {
    const queryAllFlavors = {
      text: `SELECT * FROM "flavor";`,
    };
    const result = await client.query(queryAllFlavors);
    return result.rows;
  },

  async getCoffeeByFlavor(idFlavor) {
    const queryFlavor = {
      text: `SELECT "coffee"."id", "coffee"."name", "coffee"."reference", "coffee"."description", "origin"."name" AS "origin", "flavor"."name" AS "flavor" FROM "coffee"
         JOIN "origin" ON ("coffee"."origin_id" = "origin"."id")
         JOIN "flavor" ON ("coffee"."flavor_id" = "flavor"."id")
         WHERE "coffee"."flavor_id" = $1;`,
      values: [idFlavor],
    };
    const result = await client.query(queryFlavor);
    return result.rows;
  },

  async howManyProduct() {
    const queryHowManyProduct = {
      text: `SELECT COUNT(*) FROM "coffee";`,
    };
    const result = await client.query(queryHowManyProduct);
    return result.rows[0].count;
  },

  async isExistUser (email){
    
    const queryUser = {
      text: `
      SELECT "user"."id", "user"."email", "user"."lastname", "user"."firstname", "user"."password", "role"."name" AS "role" FROM "user"
      JOIN "role" ON ("user"."role_id" = "role"."id")
      WHERE "user"."email" = $1
      `,
      values: [email]
    };

    const result = await client.query(queryUser);
    return result.rows[0];
  },

  async isExistEmail (email){
    const queryEmail = {
      text: `SELECT COUNT(*) FROM "user" WHERE email = $1`,
      values: [email]
    }

    const result = await client.query(queryEmail);
    return result.rows[0].count;
  },

  async insertUser (email, lastname, firstname, hashedPassword){
    const queryCreateUser = {
      text: `
      INSERT INTO "user" ("email", "lastname", "firstname", "password", "role_id") 
      VALUES ($1, $2, $3, $4, 2)
      RETURNING "id", "email", "lastname", "firstname", "role_id";
      `,
      values: [email, lastname, firstname, hashedPassword]
    }

    const result = await client.query(queryCreateUser);
    return result.rows[0];

  }
};
