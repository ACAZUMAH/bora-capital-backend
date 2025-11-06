import { Router, Express } from 'express';
import { authRouter } from './auth.router';
interface Routes {
  path: string;
  router: Router;
  verifyToken?: boolean;
}

const routes: Routes[] = [
  {
    path: '/auth',
    router: authRouter,
  }
];

export const applyRoutes = (app: Express) => {
  routes.map(route => app.use(route.path, route.router));
};
