import { z } from "zod";

const paymentMethod = z.enum(["CASH", "PIX", "CREDIT_CARD", "DEBIT_CARD"]);

export const SaleRequestSchema = z.object({
  payment: paymentMethod,

  observation: z.string().optional(),

  discount: z.number().nonnegative().optional(),

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
