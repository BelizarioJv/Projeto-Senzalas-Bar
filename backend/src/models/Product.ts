// Interface para os dados de entrada
interface ProductData {
  name: string;
  price: number;
  category: string;
  quantity: number;
}

export class Product {
  private static idSequence: number = 1;
  #productId: number;
  name: string;
  price: number;
  category: string;
  #quantity: number;

  constructor(attributes: ProductData) {
    this.#productId = Product.idSequence++;
    this.name = attributes.name;
    this.price = attributes.price;
    this.category = attributes.category;
    this.#quantity = attributes.quantity;
  }

  get quantity(): number {
    return this.#quantity;
  }

  get productId(): number {
    return this.#productId;
  }

  public setQuantity(newQuantity: number): void {
    this.#quantity = newQuantity;
  }

  getTotalValue(): number {
    return this.price * this.#quantity;
  }

  addProduct({ quantity }: { quantity: number }): void {
    if (quantity > 0) {
      this.#quantity += quantity;
    }
  }

  removeProduct({ quantity }: { quantity: number }): void {
    if (quantity > 0 && this.#quantity - quantity >= 0) {
      this.#quantity -= quantity;
    }
  }

  addQuantity(newQuantity: number): void {
    if (newQuantity >= 0) {
      this.#quantity += newQuantity;
    }
  }

  takeQuantity(newQuantity: number): void {
    if (newQuantity >= 0 && this.#quantity - newQuantity >= 0) {
      this.#quantity -= newQuantity;
    }
  }

  toJSON(): ProductData & { productId: number } {
    return {
      productId: this.#productId,
      name: this.name,
      price: this.price,
      category: this.category,
      quantity: this.#quantity,
    };
  }
}
