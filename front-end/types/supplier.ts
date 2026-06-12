// types/supplier.ts

import { PurchaseData } from "./purchase";

export interface SupplierData {
  id: number;

  name: string;

  email?: string;

  phone?: string;

  address?: string;

  cnpj?: string;

  observations?: string;

  purchases: PurchaseData[];

  createdAt: string;

  updatedAt: string;
}

export interface SupplierFormData {
  name: string;

  email?: string;

  phone?: string;

  address?: string;

  cnpj?: string;

  observations?: string;
}

export interface SupplierUpdate {
  name: string;

  email?: string;

  phone?: string;

  address?: string;

  cnpj?: string;

  observations?: string;
}
