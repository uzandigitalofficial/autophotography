import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    // Session-mode pooler URL required for migrate/db push (pgbouncer transaction mode on :6543 hangs on DDL)
    // Set DATABASE_URL_SESSION in env for CLI commands; runtime uses DATABASE_URL via the pg adapter
    url: process.env.DATABASE_URL_SESSION ?? process.env.DATABASE_URL!,
  },
});
