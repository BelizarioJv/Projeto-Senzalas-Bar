import express from "express";
import { createPixPayment } from "../controllers/paymentsController.js";

export const paymentRouter = express.Router();

//Post /- qr code

paymentRouter.post("/qrcode", createPixPayment);
