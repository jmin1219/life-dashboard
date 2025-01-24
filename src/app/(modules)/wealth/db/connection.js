import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const db = new Database("./database.db");

const schemaPath = path.resolve(__dirname, "./schema.sql");
if (fs.existsSync(schemaPath)) {
  const schema = fs.readFileSync(schemaPath, "utf-8");
  db.exec(schema);
}

export default db;
