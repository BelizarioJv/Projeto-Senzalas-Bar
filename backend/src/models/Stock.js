class Stock {
  constructor() {
    this.items = {};
  }

  findItem(productId) {
    return this.items[productId] || null;
  }

  addItem(product, quantity) {
    if (quantity > 0) {
      if (!this.items[product.productId]) {
        this.items[product.productId] = { product: product, quantity: 0 };
      }
      this.items[product.productId].quantity += quantity;
    }
  }

  removeItem(productId, quantity) {
    if (this.items[productId]) {
      if (this.items[productId].quantity - quantity >= 0) {
        this.items[productId].quantity -= quantity;
        if (this.items[productId].quantity === 0) {
          delete this.items[productId];
        }
      }
    }
  }

  clearStock() {
    this.items = {};
  }

  updateItemQuantity(productId, quantity) {
    if (this.items[productId]) {
      this.items[productId].quantity = quantity;
    }
  }
  getItems() {
    return Object.values(this.items);
  }
}

module.exports = Stock;
