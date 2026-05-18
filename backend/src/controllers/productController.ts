//Funçoes para processar as requisiçoes da rota de produtos
import type { Request, Response } from "express";
import { HttpError } from "../errors/HttpError";
import { stockService } from "../services/AppStock";

export const productController = {
  //Requisição para listar todos os produtos
  allProducts: async (req: Request, res: Response) => {
    try {
      const stock = await stockService.getStock();
      res.json(stock);
    } catch (error: any) {
      res.status(500).json({ error: ` esta dando erro ${error.message}` });
    }
  },

  //Requisição para criar produtos
  createProduct: async (req: Request, res: Response) => {
    try {
      const { name, price, category, quantity } = req.body;
      if (!name || !price || !category || quantity == null) {
        return res.status(400).json({
          error: "Todos os campos precisam ser preenchidos",
        });
      }
      const newProduct = await stockService.addProduct(
        name,
        price,
        category,
        quantity,
      );
      res.status(201).json(newProduct);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  //Requisição para alterar quantidade do Produto
  addQuantity: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      if (quantity == null || quantity < 0) {
        return res
          .status(400)
          .json({ error: "Quantidade deve ser um número não negativo" });
      }
      const existsProduct = await stockService.checkProductExists(Number(id));
      if (!existsProduct) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      const updated = await stockService.addQuantity(Number(id), quantity);
      res.json({
        message: "Quantidade adicionada ao estoque com sucesso",
        updated,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  tekeQuantity: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      if (quantity == null || quantity < 0) {
        return res
          .status(400)
          .json({ error: "Quantidade deve ser um número não negativo" });
      }
      const existsProduct = await stockService.checkProductExists(Number(id));
      if (!existsProduct) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      const updated = await stockService.takeQuantity(Number(id), quantity);
      res.json({ message: "Quantidade retirada com sucesso", updated });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  //Requisição para deletar um produto
  deleteProduct: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const existsProduct = await stockService.checkProductExists(Number(id));
      if (!existsProduct) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      await stockService.removeProduct(Number(id));
      res.json({ message: "Produto removido com sucesso" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
