import { ProductData } from "./product";

export interface PurchaseData {
  id: number;
  date: Date;
  total: number;
  supplierId: number;
  status: "PENDENTE" | "COMPLETO" | "CANCELADO";
  payment: "DINHEIRO" | "PIX" | "CARTAO_CREDITO" | "CARTAO_DEBITO";
  products: ProductData[];
  createdAt: string;
  updatedAt: string;
}
export interface PurchaseProductForm {
  productId: number;
  quantity: number;
  price: number;
}
export interface PurchaseFormData {
  date: Date;
  total: number;
  supplierId: number;
  status: "PENDENTE" | "COMPLETO" | "CANCELADO";
  payment: "DINHEIRO" | "PIX" | "CARTAO_CREDITO" | "PENDENTE" | "CARTAO_DEBITO";
  products: PurchaseProductForm[];
}
