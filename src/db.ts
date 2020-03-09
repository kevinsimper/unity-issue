import knex from "knex";

export function setupDatabase() {
  const db = knex({
    client: "sqlite3",
    connection: {
      filename: "./data.db"
    }
  });

  db.schema.createTable("issues", function(table) {
    table.increments("id");
    table.string("summary");
    table.text("description");
    table.integer("priority");
    table.integer("status");
  });

  return db;
}
