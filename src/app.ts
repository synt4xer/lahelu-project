import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import { httpLogger } from './utils/logger';
import compression from 'compression';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(compression());
app.use(express.json());

app.use(httpLogger);

// basic api for root
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'hi, i am alive!', timestamp: new Date().toISOString() });
});

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy' });
});

// here to add routes
import routes from './routes';
routes(app);

// Fallback for errors, undefined routes
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
