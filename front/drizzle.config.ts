import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/api/db/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: { url: process.env.DATABASE_URL! },
});
