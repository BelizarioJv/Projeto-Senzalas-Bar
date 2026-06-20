import { ProductData, ProductFormData } from "./product";

export enum PurchaseStatus {
  PENDENTE = "PENDENTE",
  COMPLETO = "COMPLETO",
  CANCELADO = "CANCELADO",
}

export enum PaymentMethod {
  DINHEIRO = "DINHEIRO",
  PIX = "PIX",
  CARTAO_CREDITO = "CARTAO_CREDITO",
  CARTAO_DEBITO = "CARTAO_DEBITO",
  PENDENTE = "PENDENTE",
}
export interface PurchaseData {
  id: number;
  date: Date;
  total: number;
  supplierId: number;
  status: PurchaseStatus;
  payment: PaymentMethod;
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
  status: PurchaseStatus;
  payment: PaymentMethod;
  products: PurchaseProductForm[];
}
