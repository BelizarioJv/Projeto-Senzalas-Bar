//Funçoes para processar as requisiçoes da rota de produtos

import { stockService } from "../services/AppStock.js";

export const productController = {
  //Requisição para listar todos os produtos
  allProducts: async (req, res) => {
    try {
      const stock = await stockService.getStock();
      res.json(stock);
    } catch (error) {
      res.status(500).json({ error: ` esta dando erro ${error.message}` });
    }
  },

  //Requisição para criar produtos
  createProduct: async (req, res) => {
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
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //Requisição para alterar quantidade do Produto
  attQuantity: async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      if (quantity == null || quantity < 0) {
        return res
          .status(400)
          .json({ error: "Quantidade deve ser um número não negativo" });
      }
      const existsProduct = await stockService.checkProductExists(id);
      if (!existsProduct) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      const updated = await stockService.updateQuantity(id, quantity);
      res.json({ message: "Quantidade atualizada com sucesso", updated });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //Requisição para deletar um produto
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const existsProduct = await stockService.checkProductExists(id);
      if (!existsProduct) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      await stockService.removeProduct(id);
      res.json({ message: "Produto removido com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
