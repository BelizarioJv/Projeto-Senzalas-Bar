import { z } from "zod";

//schema para validação dos dados de listagem de mobimentaçoes de estoque
export const MetaStockMovementRequestSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),

  sortBy: z
    .enum(["createdAt", "quantity", "movementType"])
    .default("createdAt"),

  order: z.enum(["asc", "desc"]).default("desc"),
});
