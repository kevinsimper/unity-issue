import { setupDatabase } from "./db";
import bcrypt from "bcrypt";

const knex = setupDatabase();
const table = "users";

export async function createUser(input) {
  const db = await knex;
  const password = await bcrypt.hash(input.password, 10);
  const data = {
    email: input.email,
    password
  };
  const rows = await db(table).insert(input);
  return rows;
}
