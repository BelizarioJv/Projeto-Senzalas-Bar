import { Request, Response } from "express";
import { BillingService } from "../services/billing.service.js";

const billingService = new BillingService();

export class BillingController {
  async triggerDebtReminders(req: Request, res: Response) {
    try {
      const report = await billingService.sendDebtReminders();
      return res.status(200).json({
        success: true,
        message: "Notificações de cobrança processadas.",
        report,
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
}
