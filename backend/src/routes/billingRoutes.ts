import { Router } from "express";
import { BillingController } from "../controllers/billingContoller.js";

export const billingRouter = Router();
const billingController = new BillingController();

// Rota manual para testes ou disparo sob demanda
billingRouter.post(
  "/send-debt-reminders",
  billingController.triggerDebtReminders,
);
