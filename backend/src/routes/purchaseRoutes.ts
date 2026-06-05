import express from "express";
import { PurchaseController } from "../controllers/purchaseController";

export const purchaseRouter = express.Router();

const purchaseController = new PurchaseController();

// GET /- Listar compra
purchaseRouter.get("/", purchaseController.index);

//GET /:id -
purchaseRouter.get("/:id", purchaseController.show);

// POST /purchase - Criar compra
purchaseRouter.post("/", purchaseController.create);

// DELETE /purchase/:id - Remover compra
purchaseRouter.delete("/:id", purchaseController.delete);
