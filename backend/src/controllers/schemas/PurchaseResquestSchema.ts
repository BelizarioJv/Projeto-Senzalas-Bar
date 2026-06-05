import { z } from "zod";

const paymentMethod = z
  .enum(["CASH", "PIX", "CREDIT_CARD", "DEBIT_CARD"])
  .optional();

export const PurchaseRequestSchema = z.object({
  supplierId: z.number().int().positive(),

  payment: paymentMethod,

  items: z
    .array(
      z.object({
        productId: z.number().int().positive(),

        quantity: z.number().int().positive(),

        price: z.number().positive(),
      }),
    )
    .min(1),
});
