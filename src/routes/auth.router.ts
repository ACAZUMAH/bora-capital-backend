import { Router } from "express";
import { signInUser, signUpUser, verifyEmail } from "src/controllers";

const router = Router();

router.post("/signup", signUpUser)
router.post("/signin", signInUser)
router.post("/verify-email", verifyEmail)

export const authRouter = router;
