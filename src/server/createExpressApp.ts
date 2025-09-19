import express from "express";
import helmet, { HelmetOptions } from "helmet";
import cors from "cors";

const helmetOptions: HelmetOptions = {
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
};

export const createExpressApp = () => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));

  app.use(express.json({ limit: "50mb" }));

  app.use(helmet(helmetOptions));

  app.use(helmet.hidePoweredBy());
  app.disable("x-powered-by");
  
  app.use(cors());

  app.get("/", (_req, res) => {
    return res.status(200).json({ message: "Hello World!" });
  });

  app.get("/health", (_req, res) => {
    return res.status(200).json({ status: "ok" });
  });

  return app;
};
