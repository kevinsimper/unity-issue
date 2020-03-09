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
  const rows = await db(table).insert(data);
  return rows;
}

export async function getUser(email: string) {
  const db = await knex;
  const rows = await db(table)
    .where("email", email)
    .limit(1);
  return rows[0];
}
