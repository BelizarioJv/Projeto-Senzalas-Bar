import { z } from "zod";

//schema para validação dos dados de criação de categorias, onde o campo name é obrigatório e deve conter pelo menos 1 caractere
export const CategoryRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
