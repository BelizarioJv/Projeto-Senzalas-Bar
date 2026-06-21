import { z } from "zod";

const paymentMethod = z.enum([
  "DINHEIRO",
  "PIX",
  "CARTAO_CREDITO",
  "CARTAO_DEBITO",
]);

export const MetaSaleRequestSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
  total: z.coerce.number().optional(),
  sortBy: z.string().default("total"),
  order: z.enum(["asc", "desc"]).default("asc"),
});

export const SaleRequestSchema = z.object({
  payment: paymentMethod,

  observation: z.string().optional(),

  discountPercent: z
    .number()
    .min(0, { message: "O desconto não pode ser negativo" })
    .max(100, { message: "O desconto não pode ser maior que 100%" })
    .optional(),

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
