import express from "express";
import { SupplierController } from "../controllers/supplierController";

export const supplierRouter = express.Router();

const supplierController = new SupplierController();

// GET /supplier - Listar Fornecedores
supplierRouter.get("/", supplierController.index);

// POST /supplier - Criar fornecedor
supplierRouter.post("/", supplierController.create);

// PUT /supplier/:id - Atualizar dados do fornecedor
supplierRouter.put("/:id", supplierController.update);

// DELETE /supplier/:id - Remover fornecedor
supplierRouter.delete("/:id", supplierController.delete);
