import { api } from "./api";
import {
  SupplierData,
  SupplierFormData,
  SupplierUpdate,
} from "@/types/supplier";
import { handleAxiosError } from "@/utils/handleAxiosError";

export interface SupplierResponse {
  data: SupplierData[];
}

// Buscar fornecedores na API /supplier
export async function getSuppliers(): Promise<SupplierResponse> {
  try {
    const response = await api.get<SupplierResponse>("/supplier");
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Buscar fornecedor específico
export async function showSupplier(id: string): Promise<SupplierData> {
  try {
    const response = await api.get<SupplierData>(`/supplier/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Criar fornecedor
export async function createSupplier(data: SupplierFormData) {
  try {
    const response = await api.post<SupplierFormData>("/supplier", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Atualizar fornecedor
export async function updateSupplier(id: string, data: SupplierUpdate) {
  try {
    const response = await api.put<SupplierUpdate>(`/supplier/${id}`, data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Deletar produto
export async function deleteSupplier(id: string) {
  try {
    const response = await api.delete<SupplierData>(`/supplier/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}
