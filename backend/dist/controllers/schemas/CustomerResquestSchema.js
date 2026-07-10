import { z } from "zod";
// Schema base para criação de um cliente
export const CustomerRequestSchema = z.object({
    name: z
        .string("Name is required")
        .min(3, "O nome deve ter no mínimo 3 caracteres")
        .max(100, "O nome deve ter no máximo 100 caracteres"),
    phone: z.string().optional().nullable(),
    email: z.string().email("Formato de e-mail inválido").optional().nullable(),
    // O debtBalance não costuma ser enviado no "create", pois inicia em 0.00.
    // Mas caso queira permitir abrir um cliente já com saldo devedor anterior:
    debtBalance: z
        .number()
        .min(0, "O saldo devedor não pode ser negativo")
        .optional(),
});
// Schema para atualização (partial torna todos os campos opcionais)
export const UpdateCustomerRequestSchema = CustomerRequestSchema.partial();
// Schema para validação dos Query Parameters da listagem/paginação
export const MetaCustomerRequestSchema = z.object({
    page: z.string().optional().default("1"),
    pageSize: z.string().optional().default("10"),
    name: z.string().optional(),
    sortBy: z
        .enum(["name", "createdAt", "debtBalance"])
        .optional()
        .default("name"),
    order: z.enum(["asc", "desc"]).optional().default("asc"),
    onlyDebtors: z.enum(["true", "false"]).optional(),
});
