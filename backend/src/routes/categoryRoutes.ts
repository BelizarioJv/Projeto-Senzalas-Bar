//Rotas relacionadas aos Produtos

import express from "express";
import { CategoryController } from "../controllers/categoryController";

export const categoryRouter = express.Router();
const categoryController = new CategoryController();

// GET /category - Listar categorias
categoryRouter.get("/", categoryController.index);

// POST /category - Criar nova categoria
categoryRouter.post("/", categoryController.create);

//Put /category/category/update/:id - update categoria
categoryRouter.put("/update/:id", categoryController.update);

// DELETE /category/:id - Remover a categoria
categoryRouter.delete("/:id", categoryController.delete);
