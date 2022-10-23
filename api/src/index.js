import express from 'express';
import routes from './routes.js';

import cors from './app/middlewares/cors.js';

import errorHandler from './app/middlewares/errorHandler.js';

const app = express();
app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(3001, () => console.log('🔥 Server Started at localhost:3001'));
