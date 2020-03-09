import { setupDatabase } from "./db";

const knex = setupDatabase();
const table = "issues";

export async function createIssue(input) {
  const db = await knex;
  const rows = await db(table).insert(input);
  return rows;
}

export async function getIssues() {
  const db = await knex;
  const rows = await db(table).select();
  return rows;
}

export async function getIssue(id: number) {
  const db = await knex;
  const rows = await db(table).where("id", id);
  return rows;
}

export async function updateIssue(input) {
  const db = await knex;
  const key = "id";
  const { [key]: id, ...data } = input;
  const row = await db(table)
    .where("id", id)
    .update(data);
  return row;
}
