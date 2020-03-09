import { setupDatabase } from "./db";

const knex = setupDatabase();
const table = "users";

export async function createUser(input) {
  const db = await knex;
  const rows = await db(table).insert(input);
  return rows;
}
