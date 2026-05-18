//Rotas relacionadas aos Produtos

import express from "express";
import { productController } from "../controllers/productController";

export const productRouter = express.Router();

// GET /products - Listar produtos
productRouter.get("/", productController.allProducts);

// POST /products - Criar produto
productRouter.post("/", productController.createProduct);

// PUT /products/:id - Atualizar quantidade
productRouter.put("/:id", productController.addQuantity);

// DELETE /products/:id - Remover produto
productRouter.delete("/:id", productController.deleteProduct);
