import express from "express";
import { LoginController } from "../controllers/loginController.js";
export const loginRouter = express.Router();
const loginController = new LoginController();
// Post /- Login
loginRouter.post("/", loginController.index);
