import express from "express";
import { SupplierController } from "../controllers/supplierController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const supplierRouter = express.Router();

const supplierController = new SupplierController();

// GET /supplier - Listar Fornecedores
supplierRouter.get("/", supplierController.index);

//GET /supplier/:id - Mostrar fornecedor
supplierRouter.get("/:id", supplierController.show);

// POST /supplier - Criar fornecedor
supplierRouter.post("/", supplierController.create);

// PUT /supplier/:id - Atualizar dados do fornecedor
supplierRouter.put("/:id", supplierController.update);

// DELETE /supplier/:id - Remover fornecedor
supplierRouter.delete("/:id", supplierController.delete);
