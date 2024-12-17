import fs from 'fs';
import path from 'path';
import { Express, Router } from 'express';
import { AppConstant } from '../utils/constant';

module.exports = (app: Express) => {
  // Read all files in the current directory
  const files = fs.readdirSync(__dirname);

  // load all routes
  for (const file of files) {
    if (file !== 'index.ts' && file.endsWith('.ts')) {
      const filePath = path.join(__dirname, file);
      const routeName = file.replace('.ts', '');

      // import route module dynamically
      const route: Router = require(filePath).default;

      // if route is a function, register it
      if (route !== undefined) {
        app.use(`/${AppConstant.API_BASE_PATH}/${routeName}`, route);
      }
    }
  }
};
