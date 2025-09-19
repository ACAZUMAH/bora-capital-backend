import { Router, Express } from "express";
import { authRouter } from "./auth.router";
import { verifyToken } from "src/middlewares/verifyTokens";

interface Routes {
  path: string;
  router: Router;
  verifyToken?: boolean;
}

const routes: Routes[] = [
  {
    path: "/auth",
    router: authRouter,
  },
];

export const applyRoutes = (app: Express) => {
  routes.map((route) => {
    if (route.verifyToken) {
      app.use(route.path, verifyToken, route.router);
    } else {
      app.use(route.path, route.router);
    }
  });
};

