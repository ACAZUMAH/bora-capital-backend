import express from 'express';
import helmet, { HelmetOptions } from 'helmet';
import cors from 'cors';
import {
  isDevelopment,
  isProduction,
  isStaging,
  productionWhitelist,
} from 'src/common/constants';

const helmetOptions: HelmetOptions = {
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
};

const corsOptions = {
  maxAge: 600,
  credentials: true,
  origin: (
    origin: any,
    callback: (err: Error | null, allowed?: boolean) => void
  ) => {
    if (!origin) {
      callback(null, true);
    } else if (isDevelopment) {
      callback(null, true);
    } else if (isStaging) {
      callback(null, true); // TODO: Add staging whitelist
    } else if (isProduction && productionWhitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
};

export const createExpressApp = () => {
  const app = express();

  app.use(express.json({ limit: '50mb' }));

  app.use(express.urlencoded({ extended: true }));

  app.use(helmet(helmetOptions));

  app.use(helmet.hidePoweredBy());
  app.disable('x-powered-by');

  app.use('/*splat', cors());
  app.use(cors(corsOptions));

  app.get('/', (_req, res) => {
    return res.status(200).json({ message: 'Hello World!' });
  });

  app.get('/health', (_req, res) => {
    return res.status(200).json({ status: 'ok' });
  });

  return app;
};
