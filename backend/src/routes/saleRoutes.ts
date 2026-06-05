import express from "express";
import { SaleController } from "../controllers/saleController";

export const saleRouter = express.Router();

const saleController = new SaleController();

// GET /- Listar compra
saleRouter.get("/", saleController.index);

//GET /:id -
saleRouter.get("/:id", saleController.show);

// POST /purchase - Criar compra
saleRouter.post("/", saleController.create);

// DELETE /purchase/:id - Remover compra
saleRouter.delete("/:id", saleController.delete);
