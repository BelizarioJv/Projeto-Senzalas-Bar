import { prisma } from "../database/prisma";
import { Handler } from "express";
import { CategoryRequestSchema } from "./schemas/CategoryRequestSchema";
import { HttpError } from "../errors/HttpError";

export class CategoryController {
  index: Handler = async (req, res, next) => {
    try {
      const categories = await prisma.product.findMany();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  };

  create: Handler = async (req, res, next) => {
    try {
      const body = CategoryRequestSchema.parse(req.body);
      const newCategory = await prisma.product.create({
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
      const category = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: { products: true },
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
      await prisma.product.delete({
        where: { id: Number(id) },
        include: { products: true },
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
      const updatedCategory = await prisma.product.update({
        where: { id: Number(id) },
        data: body,
      });
      res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
  };
}
