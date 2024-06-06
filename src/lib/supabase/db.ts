import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  console.log("🔴 Cannot find database url");
}

const client = postgres(process.env.DATABASE_URL!, {
  max: 1,
});

const db = drizzle(client, {
  schema,
});

export default db;
