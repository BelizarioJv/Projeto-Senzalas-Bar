const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const adapter = new JSONFile("./src/database/db.json");
const db = new Low(adapter, { products: [] });

async function initDB() {
  await db.read();
  db.data ||= { products: [] };
  await db.write();
}
initDB();

module.exports = {
  addProduct: async (name, price, category, quantity) => {
    await db.read();

    const newProduct = {
      productId: Date.now().toString(),
      name,
      price,
      category,
      quantity,
    };

    db.data.products.push(newProduct);
    await db.write();

    return newProduct;
  },

  getStock: async () => {
    await db.read();
    return db.data.products;
  },

  checkProductExists: async (id) => {
    await db.read();
    return db.data.products.some((p) => p.productId === id);
  },

  updateQuantity: async (id, quantity) => {
    await db.read();

    const product = db.data.products.find((p) => p.productId === id);
    if (product) {
      product.quantity = quantity;
      await db.write();
    }
    return product;
  },

  removeProduct: async (id) => {
    await db.read();
    db.data.products = db.data.products.filter((p) => p.productId !== id);
    await db.write();
  },
};
