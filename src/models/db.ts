import knex from "knex";

export async function setupDatabase() {
  const db = knex({
    client: "sqlite3",
    connection: {
      filename: "./data.db"
    }
  });

  try {
    await db.schema.createTable("issues", function(table) {
      table.increments("id");
      table.string("summary");
      table.text("description");
      table.integer("priority");
      table.integer("status");
      table.integer("assigned");
    });

    await db.schema.createTable("users", function(table) {
      table.increments("id");
      table.string("email");
      table.string("password");
    });
  } catch (e) {
    console.log("Tables already exist");
  }

  return db;
}
