import { ErrorRequestHandler } from "express";
import { HttpError } from "../errors/HttpError.js";
import { ZodError } from "zod";

// Middleware de tratamento de erro
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // 1. Tratamento para erros de validação do Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Falha na validação dos dados enviados.",
      errors: err.issues.map((e) => ({
        campo: e.path.join("."),
        mensagem: e.message,
      })),
    });
  }

  // 2. Tratamento para seus erros customizados (HttpError)
  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message });
  }

  // 3. Tratamento para erros nativos do JavaScript/Node (ex: Prisma ou JWT)
  if (err instanceof Error) {
    return res.status(500).json({ message: err.message });
  }

  // Fallback para erros desconhecidos
  return res.status(500).json({ message: "internal server error" });
};
