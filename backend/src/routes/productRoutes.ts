import express from "express";
import { ProductController } from "../controllers/productController";

export const productRouter = express.Router();

const productController = new ProductController();

// GET /products - Listar produtos
productRouter.get("/", productController.index);

//GET /products/low-stock - Listar produtos com estoque baixo
productRouter.get("/low-stock", productController.getProductsLowStock);

//GET /products/:id - Buscar produto espefico
productRouter.get("/:id", productController.show);

// POST /products - Criar produto
productRouter.post("/", productController.create);

// PUT /products/:id - Atualizar quantidade
productRouter.put("/:id", productController.update);

// DELETE /products/:id - Remover produto
productRouter.delete("/:id", productController.delete);
