import { Express } from 'express';
import { verifyToken } from './verifyTokens';
import { logResponseTime } from './response-log';
import { verifyClient } from './verifyClient';

const middlewares = [logResponseTime, verifyToken, verifyClient];

export const applyMiddlewares = (app: Express) => {
  middlewares.map(middleware => app.use(middleware));
};
