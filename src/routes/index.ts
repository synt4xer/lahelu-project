import fs from 'fs';
import path from 'path';
import { Express, Router } from 'express';
import { AppConstant } from '../utils/constant';

export default (app: Express) => {
  // Read all files in the current directory
  const files = fs.readdirSync(__dirname);

  // load all routes
  for (const file of files) {
    // Skip index file and only process .ts or .js files
    if (
      file !== 'index.ts' &&
      file !== 'index.js' &&
      (file.endsWith('.ts') || file.endsWith('.js'))
    ) {
      const filePath = path.join(__dirname, file);
      // Remove either .ts or .js extension
      const routeName = file.replace(/\.(ts|js)$/, '');

      // import route module dynamically
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const route: Router = require(filePath).default;

      // if route is a function, register it
      if (route !== undefined) {
        app.use(`${AppConstant.API_BASE_PATH}/${routeName}`, route);
      }
    }
  }
};
