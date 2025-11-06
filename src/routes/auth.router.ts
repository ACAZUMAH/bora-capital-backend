import { Router } from 'express';
import { verifyAccessToken } from "src/controllers";

const router = Router();

router.post("/refresh", verifyAccessToken);

export const authRouter = router;
