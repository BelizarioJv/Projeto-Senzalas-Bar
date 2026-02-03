class Product {
  #productId;
  #quantity;
  constructor(productId = null, name, price, category, quantity = 0) {
    this.#productId = productId || require("uuid").v4();
    this.name = name;
    this.price = price;
    this.category = category;
    this.#quantity = quantity;
  }

  get quantity() {
    return this.#quantity;
  }

  get productId() {
    return this.#productId;
  }

  getTotalValue() {
    return this.price * this.#quantity;
  }

  addProduct(quantity) {
    if (quantity > 0) {
      this.#quantity += quantity;
    }
  }

  removeProduct(quantity) {
    if (quantity > 0 && this.#quantity - quantity >= 0) {
      this.#quantity -= quantity;
    }
  }

  toJSON() {
    return {
      productId: this.#productId,
      name: this.name,
      price: this.price,
      category: this.category,
      quantity: this.#quantity,
    };
  }
}

module.exports = Product;
