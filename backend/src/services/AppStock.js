import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { Product } from "../models/Product.js";

//Configuraçoes Json
const adapter = new JSONFile("./src/database/db.json");
const db = new Low(adapter, { products: [] });

//Inicializando o banco de dados
async function initDB() {
  await db.read();
  db.data ||= { products: [] };
  await db.write();
}
initDB();

//Objeto de Funçao com serviços de stock/produto
export const stockService = {
  //Pegar todo o estoque no banco
  getStock: async () => {
    await db.read();
    return db.data.products;
  },

  //Verificar produto no estoque
  checkProductExists: async (id) => {
    await db.read();
    return db.data.products.some((p) => p.productId === id);
  },

  //Adicionar Produtos no banco de dados
  addProduct: async (name, price, category, quantity) => {
    await db.read();

    const newProduct = new Product(name, price, category, quantity);

    db.data.products.push(newProduct);
    await db.write();

    return newProduct;
  },

  //Adicionar quantidade no produto
  updateQuantity: async (id, quantity) => {
    await db.read();

    const product = db.data.products.find((p) => p.productId === id);
    if (product) {
      product.quantity = quantity;
      await db.write();
    }
    return product;
  },

  //Remover produto no banco
  removeProduct: async (id) => {
    await db.read();
    db.data.products = db.data.products.filter((p) => p.productId !== id);
    await db.write();
  },
};
