import { api } from "./api";
import { PurchaseData, PurchaseFormData } from "@/types/purchase";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { MetaData } from "@/types/metaDataPage";

export interface PurchaseResponse {
  data: PurchaseData[];
  meta: MetaData;
}

// Buscar vendas na API /Purchase
export async function getPurchase(
  page: number,
  pageSize: number,
): Promise<PurchaseResponse> {
  try {
    const response = await api.get<PurchaseResponse>("/purchase", {
      params: { page, pageSize },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Buscar venda específico
export async function showPurchase(id: string): Promise<PurchaseData> {
  try {
    const response = await api.get<PurchaseData>(`/purchase/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Criar venda
export async function createPurchase(data: PurchaseFormData) {
  try {
    const response = await api.post<PurchaseFormData>("/purchase", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Atualizar venda
export async function updatePurchase(id: string, data: PurchaseData) {
  try {
    const response = await api.put<PurchaseData>(`/purchase/${id}`, data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Deletar venda
export async function deletePurchase(id: string) {
  try {
    const response = await api.delete<PurchaseData>(`/purchase/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}
