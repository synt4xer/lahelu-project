import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  out: "./migrations",
  dialect: "postgresql",
  schema: "./src/database/schema/*",
  dbCredentials: {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE!,
    ssl: false,
  },
  migrations: {
    table: "migrations",
    schema: "public",
  }
} satisfies Config;

