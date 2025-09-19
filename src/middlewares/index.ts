import { Express } from "express";
import { verifyToken } from "./verifyTokens";
import { errorHandler } from "./errorHandler";

const middlewares = [
  //verifyToken,
  errorHandler
];

export const applyMiddlewares = (app: Express) => {
    middlewares.map(middleware => app.use(middleware));
}