import 'dotenv/config';

export const AppConstant = Object.freeze({
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_BASE_PATH: process.env.API_BASE_PATH || '',
  SALT: Number(process.env.SALT) || 10,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRED_TIME: process.env.JWT_EXPIRED_TIME || '24h',


   // DATABASE
   DB_HOST: process.env.DB_HOST,
   DB_PORT: Number(process.env.DB_PORT) || 5432,
   DB_USER: process.env.DB_USER,
   DB_PASSWORD: process.env.DB_PASSWORD,
   DB_DATABASE: process.env.DB_DATABASE,

   // S3
   S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
   S3_REGION: process.env.S3_REGION,
   S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
   S3_SECRET_KEY: process.env.S3_SECRET_KEY,
});
