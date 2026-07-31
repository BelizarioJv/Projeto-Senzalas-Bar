import cron from "node-cron";
import { BillingService } from "../services/billing.service.js";
import { isTodayFifthBusinessDay } from "../utils/date.js";
const billingService = new BillingService();
export function initMonthlyBillingJob() {
    // Executa todo dia às 09:00 AM e valida usando a função utilitária
    cron.schedule("0 9 * * *", async () => {
        if (isTodayFifthBusinessDay()) {
            console.log("Hoje é o 5º dia útil do mês. Iniciando envios de cobrança...");
            await billingService.sendDebtReminders();
        }
    });
}
