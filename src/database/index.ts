import { Pool } from 'pg';
import { AppConstant } from '../utils/constant';
import { Logger } from 'drizzle-orm/logger';
import { drizzle } from 'drizzle-orm/node-postgres';
import { logger as customLogger } from '../utils/logger';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const pool = new Pool({
  host: AppConstant.DB_HOST,
  port: AppConstant.DB_PORT,
  user: AppConstant.DB_USER,
  password: AppConstant.DB_PASSWORD,
  database: AppConstant.DB_DATABASE,
});

// migrator from drizzle-orm to automatically run migrations
// used in this run this test project only
migrate(drizzle(pool), { migrationsFolder: './migrations' });

class MyLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    customLogger.info(`QUERY: ${query}, PARAMS: ${params}`);
  }
}

const db = drizzle(pool, { logger: new MyLogger() });

export default db;
