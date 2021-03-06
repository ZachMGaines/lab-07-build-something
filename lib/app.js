import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';

import treeController from '../controllers/trees.js';

const app = express();

app.use(express.json());

if (app) {
  console.log('hi');
}

app.use('/api/v1/orders', treeController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
