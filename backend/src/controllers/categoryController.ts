import { prisma } from "../database/prisma";
import { Handler } from "express";
import { CategoryRequestSchema } from "./schemas/CategoryRequestSchema";
import { HttpError } from "../errors/HttpError";

//Controller de categorias com as operações de CRUD e listagem.
export class CategoryController {
  index: Handler = async (req, res, next) => {
    try {
      const categories = await prisma.supplier.findMany();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  };

  create: Handler = async (req, res, next) => {
    try {
      const body = CategoryRequestSchema.parse(req.body);
      const newCategory = await prisma.supplier.create({
        data: body,
      });
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  };

  show: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await prisma.supplier.findUnique({
        where: { id: Number(id) },
        include: { product: true },
      });
      if (!category) {
        throw new HttpError(404, "Category not found");
      }
      res.json(category);
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      await prisma.supplier.delete({
        where: { id: Number(id) },
        include: { product: true },
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = CategoryRequestSchema.parse(req.body);
      const updatedCategory = await prisma.supplier.update({
        where: { id: Number(id) },
        data: body,
      });
      res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
  };
}
