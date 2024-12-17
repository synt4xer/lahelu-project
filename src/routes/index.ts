import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { AppConstant } from '../utils/constant';

const router = Router();

// Read all files in the current directory
const files = fs.readdirSync(__dirname);

// Load all route files dynamically
files.forEach((file) => {
  // Skip index.ts and non .ts files
  if (file !== 'index.ts' && file.endsWith('.ts')) {
    // Remove .ts extension and create route path
    const routeName = file.replace('.ts', '');
    
    // Import route module dynamically
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const route = require(path.join(__dirname, file));
    
    // Register the route
    router.use(`${AppConstant.API_BASE_PATH}/${routeName}`, route.default || route);
  }
});

export default router;
