import express from "express";
import { ProductController } from "../controllers/productController";

export const productRouter = express.Router();

const productController = new ProductController();

// GET /products - Listar produtos
productRouter.get("/", productController.index);

// POST /products - Criar produto
productRouter.post("/", productController.create);

// PUT /products/:id - Atualizar quantidade
productRouter.put("/:id", productController.update);

// DELETE /products/:id - Remover produto
productRouter.delete("/:id", productController.delete);
