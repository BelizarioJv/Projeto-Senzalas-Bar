import { z } from "zod";

const paymentMethod = z.enum([
  "DINHEIRO",
  "PIX",
  "CARTAO_CREDITO",
  "CARTAO_DEBITO",
]);

export const SaleRequestSchema = z.object({
  payment: paymentMethod,

  observation: z.string().optional(),

  discount: z.number().nonnegative().optional(),

  products: z
    .array(
      z.object({
        productId: z.number().int().positive(),

        quantity: z.number().int().positive(),

        price: z.number().positive(),
      }),
    )
    .min(1),
});
