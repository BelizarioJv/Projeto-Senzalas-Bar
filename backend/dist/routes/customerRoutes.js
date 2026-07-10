import express from "express";
import { CustomerController } from "../controllers/customerController.js";
export const customerRouter = express.Router();
const customerController = new CustomerController();
// GET /products - Listar clientes
customerRouter.get("/", customerController.index);
// GET /products/all - Listar todos os clientes sem paginação
customerRouter.get("/all", customerController.allCustomers);
//GET /products/low-stock - Dados do dashboard de clientes (total de clientes e total de devedores)
customerRouter.get("/customer-metrics", customerController.getDashboardMetrics);
//GET /products/:id - Buscar cliente espefico
customerRouter.get("/:id", customerController.show);
// POST /products - Criar cliente
customerRouter.post("/", customerController.create);
// PUT /products/:id - Atualizar dados cliente
customerRouter.put("/:id", customerController.update);
// DELETE /products/:id - Remover cliente
customerRouter.delete("/:id", customerController.delete);
