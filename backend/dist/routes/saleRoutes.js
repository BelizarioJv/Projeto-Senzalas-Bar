import express from "express";
import { SaleController } from "../controllers/saleController.js";
export const saleRouter = express.Router();
const saleController = new SaleController();
// GET /- Listar venda
saleRouter.get("/", saleController.index);
// GET /monthly-total - Total de vendas do mês
saleRouter.get("/monthly-total", saleController.monthlyTotal);
//GET /:id - Buscar venda
saleRouter.get("/:id", saleController.show);
// POST /purchase - Criar venda
saleRouter.post("/", saleController.create);
// DELETE /purchase/:id - Remover venda
saleRouter.delete("/:id", saleController.delete);
