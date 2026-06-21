import { ProductData } from "./product";

export interface SaleData {
  id: number;
  dateTime: Date;
  total: number;
  payment: "DINHEIRO" | "PIX" | "CARTAO_CREDITO" | "CARTAO_DEBITO";
  discountPercent: number;
  discountValue: number;
  observation: string;
  products: ProductData[];
  createdAt: string;
  updatedAt: string;
}

export interface SaleProductForm {
  productId: number;
  quantity: number;
  price: number;
}

export interface SaleFormData {
  dateTime: Date;
  total: number;
  payment: "DINHEIRO" | "PIX" | "CARTAO_CREDITO" | "CARTAO_DEBITO";
  discountPercent: number;
  observation: string;
  products: SaleProductForm[];
}
