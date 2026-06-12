import { ProductData } from "./product";

export interface PurchaseData {
  id: number;
  date: Date;
  total: number;
  supplierId: number;
  status: "PENDENTE" | "COMPLETO" | "CANCELADO";
  paymentMethod:
    | "DINHEIRO"
    | "PIX"
    | "CARTAO_CREDITO"
    | "PENDENTE"
    | "CARTAO_DEBITO";
  products: ProductData[];
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseForm {
  id: number;
  date: Date;
  total: number;
  supplierId: number;
  status: "PENDENTE" | "COMPLETO" | "CANCELADO";
  paymentMethod:
    | "DINHEIRO"
    | "PIX"
    | "CARTAO_CREDITO"
    | "PENDENTE"
    | "CARTAO_DEBITO";
  products: ProductData[];
}
