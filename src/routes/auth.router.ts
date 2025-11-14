import { Router } from 'express';
import { verifyAccessToken } from "src/controllers";

const router = Router();

router.get("/refresh", verifyAccessToken);

export const authRouter = router;
