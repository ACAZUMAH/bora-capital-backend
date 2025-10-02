import { Express } from "express";
import { verifyToken } from "./verifyTokens";
import { errorHandler } from "./errorHandler";
import { logResponseTime } from "./response-log";

const middlewares = [
  verifyToken,
  logResponseTime
  //errorHandler
];

export const applyMiddlewares = (app: Express) => {
    middlewares.map(middleware => app.use(middleware));
}