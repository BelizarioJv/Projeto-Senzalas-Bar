const express = require("express"); // criando servidor http com express para manipulação do estoque de produtos
const router = express.Router(); //
const stockService = require("../services/appStock");

// POST /products - Criar produto
router.post("/", async (req, res) => {
  try {
    const { name, price, category, quantity } = req.body;
    if (!name || !price || !category || quantity == null) {
      return res.status(400).json({
        error: "Campos obrigatórios: name, price, category, quantity",
      });
    }
    const product = await stockService.addProduct(
      name,
      price,
      category,
      quantity,
    );
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /products - Listar produtos
router.get("/", async (req, res) => {
  try {
    const stock = await stockService.getStock();
    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /products/:id - Atualizar quantidade
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    if (quantity == null || quantity < 0) {
      return res
        .status(400)
        .json({ error: "Quantidade deve ser um número não negativo" });
    }
    const exists = await stockService.checkProductExists(id);
    if (!exists) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    const updated = await stockService.updateQuantity(id, quantity);
    res.json({ message: "Quantidade atualizada com sucesso", updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /products/:id - Remover produto
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const exists = await stockService.checkProductExists(id);
    if (!exists) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    await stockService.removeProduct(id);
    res.json({ message: "Produto removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
