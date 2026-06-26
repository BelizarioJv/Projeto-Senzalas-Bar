import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../database/prisma";
import { Handler } from "express";
import { HttpError } from "../errors/HttpError";
import { LoginRequestSchema } from "./schemas/LoginRequestSchema";

//Controller de login com geraçao JWT token
export class LoginController {
  index: Handler = async (req, res, next) => {
    try {
      const data = LoginRequestSchema.parse(req.body);

      // 1. Verificação de segurança da chave secreta
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        throw new HttpError(500, "Configuração interna do servidor ausente.");
      }

      const user = await prisma.user.findUnique({ where: { user: data.user } });
      if (!user) throw new HttpError(404, "Usuário não encontrado");

      const validPassword = await bcrypt.compare(data.password, user.password);
      if (!validPassword) throw new HttpError(401, "Senha inválida"); // Alterado para 401 (Não autorizado)

      // 2. Agora o TS sabe 100% que 'secret' é uma string válida
      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (error) {
      next(error);
    }
  };
}
