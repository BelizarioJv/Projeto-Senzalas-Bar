import { z } from "zod";

//listas de opções para campos específicos
const unitOfMeasurement = z.enum(["UNIDADE", "KG", "LITRO", "FARDO"]);
const productStatus = z.enum(["ATIVO", "INATIVO"]);
const productsCategory = z.enum([
  "CERVEJA",
  "VINHOS",
  "DESTILADOS",
  "REFRIGERANTES",
  "SUCO",
  "AGUA",
]);

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
  category: productsCategory,
  brand: z.string().optional(),
  unitMeasure: unitOfMeasurement,
  costPrice: z.number().positive("Preço de custo deve ser um número positivo"),
  createdBy: z.number().int().optional(),
  salePrice: z.number().positive("Preço de venda deve ser um número positivo"),
  minimumQuantity: z
    .number()
    .nonnegative("Quantidade mínima não pode ser negativa"),
});

//schema para validação dos dados de atualização de produtos, onde todos os campos são opcionais e podem ser atualizados individualmente
export const UpdateProductRequestSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().optional(),
  category: productsCategory,
  brand: z.string().optional(),
  unitMeasure: unitOfMeasurement.optional(),
  costPrice: z.coerce
    .number()
    .positive("Preço de custo deve ser um número positivo")
    .optional(),
  salePrice: z.coerce
    .number()
    .positive("Preço de venda deve ser um número positivo")
    .optional(),
  currentQuantity: z.coerce
    .number()
    .nonnegative("Quantidade atual não pode ser negativa")
    .optional(),
  minimumQuantity: z.coerce
    .number()
    .nonnegative("Quantidade mínima não pode ser negativa")
    .optional(),
  status: productStatus.optional(),
});
