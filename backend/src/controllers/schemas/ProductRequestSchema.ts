import { z } from "zod";

//listas de opções para campos específicos
const unitOfMeasurement = z.enum(["UNIT", "KG", "LITER", "FARDO"]);
const productStatus = z.enum(["ACTIVE", "INACTIVE"]);

//schema para validação dos dados de listagem de produtos, com paginação, filtros e ordenação
export const MetaProductRequestSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  pageSize: z.coerce.number().int().positive().optional(),
  name: z.string().optional(),
  status: productStatus.optional(),
  sortBy: z.enum(["name", "status", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

//schema para validação dos dados de criação de produtos, onde todos os campos são obrigatórios, exceto descrição
export const ProductRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  categoryId: z.number().int().positive(),
  brand: z.string().optional(),
  unitMeasure: unitOfMeasurement,
  costPrice: z.number().positive("Preço de custo deve ser um número positivo"),
  salePrice: z.number().positive("Preço de venda deve ser um número positivo"),
  minimumQuantity: z
    .number()
    .nonnegative("Quantidade mínima não pode ser negativa"),
});

//schema para validação dos dados de atualização de produtos, onde todos os campos são opcionais e podem ser atualizados individualmente
export const UpdateProductRequestSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().optional(),
  categoryId: z.number().int().positive().optional(),
  brand: z.string().optional(),
  unitMeasure: unitOfMeasurement.optional(),
  costPrice: z
    .number()
    .positive("Preço de custo deve ser um número positivo")
    .optional(),
  salePrice: z
    .number()
    .positive("Preço de venda deve ser um número positivo")
    .optional(),
  currentQuantity: z
    .number()
    .nonnegative("Quantidade atual não pode ser negativa")
    .optional(),
  minimumQuantity: z
    .number()
    .nonnegative("Quantidade mínima não pode ser negativa")
    .optional(),
  status: productStatus.optional(),
});
