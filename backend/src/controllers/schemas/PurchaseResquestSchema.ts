import { z } from "zod";

const paymentMethod = z
  .enum(["DINHEIRO", "PIX", "CARTAO_CREDITO", "CARTAO_DEBITO"])
  .optional();

export const MetaPurchaseRequestSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
  total: z.coerce.number().optional(),
  sortBy: z.string().default("total"),
  order: z.enum(["asc", "desc"]).default("asc"),
});

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
