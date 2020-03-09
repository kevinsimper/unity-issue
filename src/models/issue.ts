import { setupDatabase } from "./db";

const knex = setupDatabase();

export async function createIssue(input) {
  const db = await knex;
  const rows = await db("issues").insert(input);
  return rows;
}

export async function getIssues() {
  const db = await knex;
  const rows = await db("issues").select();
  return rows;
}

export async function getIssue(id: number) {
  const db = await knex;
  const rows = await db("issues").where("id", id);
  return rows;
}

export async function updateIssue(input) {
  const db = await knex;
  const key = "id";
  const { [key]: id, ...data } = input;
  const row = await db("issues")
    .where("id", id)
    .update(data);
  return row;
}
