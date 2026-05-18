import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { Product } from "../models/Product.js";

// Definição da estrutura do banco
interface DatabaseSchema {
  products: Product[];
}

// Configurações Json
const adapter = new JSONFile<DatabaseSchema>("./src/database/db.json");
const db = new Low<DatabaseSchema>(adapter, { products: [] });

// Inicializando o banco de dados
async function initDB(): Promise<void> {
  await db.read();
  db.data ||= { products: [] };
  await db.write();
}
initDB();

// Tipagem dos serviços de estoque/produto
export const stockService = {
  // Pegar todo o estoque no banco
  getStock: async (): Promise<Product[]> => {
    await db.read();
    return db.data!.products;
  },

  // Mostrar produto específico
  show: async (id: string): Promise<Product | undefined> => {
    await db.read();
    return db.data!.products.find((p) => p.productId === +id);
  },

  // Verificar produto no estoque
  checkProductExists: async (id: number): Promise<boolean> => {
    await db.read();
    return db.data!.products.some((p) => p.productId === +id);
  },

  // Adicionar Produtos no banco de dados
  addProduct: async (
    name: string,
    price: number,
    category: string,
    quantity: number,
  ): Promise<Product> => {
    await db.read();

    const newProduct = new Product({ name, price, category, quantity });

    db.data!.products.push(newProduct);
    await db.write();

    return newProduct;
  },

  // Atualizar quantidade no produto
  addQuantity: async (
    id: number,
    quantity: number,
  ): Promise<Product | undefined> => {
    await db.read();

    const raw = db.data!.products.find((p) => p.productId === +id);
    if (raw) {
      // reconstruir como instância da classe Product
      const product = new Product({
        name: raw.name,
        price: raw.price,
        category: raw.category,
        quantity: raw.quantity,
      });

      // usar o método da classe
      product.addQuantity(quantity);

      // salvar de volta no banco (como JSON)
      Object.assign(raw, product.toJSON());

      await db.write();
      return product;
    }
    return undefined;
  },

  takeQuantity: async (
    id: number,
    quantity: number,
  ): Promise<Product | undefined> => {
    await db.read();

    const raw = db.data!.products.find((p) => p.productId === +id);
    if (raw) {
      // reconstruir como instância da classe Product
      const product = new Product({
        name: raw.name,
        price: raw.price,
        category: raw.category,
        quantity: raw.quantity,
      });

      // usar o método da classe
      product.takeQuantity(quantity);

      // salvar de volta no banco (como JSON)
      Object.assign(raw, product.toJSON());

      await db.write();
      return product;
    }
    return undefined;
  },

  // Remover produto no banco
  removeProduct: async (id: number): Promise<void> => {
    await db.read();
    db.data!.products = db.data!.products.filter((p) => p.productId !== +id);
    await db.write();
  },
};
