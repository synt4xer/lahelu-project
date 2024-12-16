import { Pool } from 'pg';
import { AppConstant } from '../utils/constant';
import { Logger } from 'drizzle-orm/logger';
import { drizzle } from 'drizzle-orm/node-postgres';
import { logger as customLogger } from '../utils/logger';

const pool = new Pool({
  host: AppConstant.DB_HOST,
  port: AppConstant.DB_PORT,
  user: AppConstant.DB_USER,
  password: AppConstant.DB_PASSWORD,
  database: AppConstant.DB_DATABASE,
});

class MyLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    customLogger.info(`QUERY: ${query}, PARAMS: ${params}`);
  }
}

const db = drizzle(pool, { logger: new MyLogger() });

export default db;
