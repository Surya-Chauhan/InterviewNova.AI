import express from "express";
import {
  googleAuth,
  logOut,
  emailSignup,
  emailLogin,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/google", googleAuth);
authRouter.post("/email-signup", emailSignup);
authRouter.post("/email-login", emailLogin);
authRouter.get("/logout", logOut);

export default authRouter;