import { z } from "zod";
//schema para validação dos dados de criação
export const LoginRequestSchema = z.object({
    user: z.string().transform((val) => val.trim().toLowerCase()),
    password: z.string(),
});
