import { Express } from 'express';
import { verifyAccessToken } from './verifyTokens';
import { logResponseTime } from './response-log';
import { verifyClient } from './verifyClient';

const middlewares = [logResponseTime, verifyAccessToken, verifyClient];

export const applyMiddlewares = (app: Express) => {
  middlewares.map(middleware => app.use(middleware));
};
