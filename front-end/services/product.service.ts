import { api } from "./api";
import { ProductData, ProductFormData } from "@/types/product";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { MetaData } from "@/types/metaDataPage";

export interface ProductResponse {
  data: ProductData[];
  meta: MetaData;
}

// Buscar produtos na API /products
export async function getProducts(
  page: number,
  pageSize: number,
): Promise<ProductResponse> {
  try {
    const response = await api.get<ProductResponse>("/products", {
      params: { page, pageSize },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Buscar produto específico
export async function showProduct(id: string): Promise<ProductData> {
  try {
    const response = await api.get<ProductData>(`/products/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Criar produto
export async function createProduct(data: ProductFormData) {
  try {
    const response = await api.post<ProductFormData>("/products", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Atualizar produto
export async function updateProduct(id: string, data: ProductData) {
  try {
    const response = await api.put<ProductData>(`/products/${id}`, data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Deletar produto
export async function deleteProduct(id: string) {
  try {
    const response = await api.delete<ProductData>(`/products/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Buscar produtos com estoque baixo
export async function getProductsLowStock(): Promise<ProductData[]> {
  try {
    const response = await api.get<ProductData[]>(`/products/low-stock`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}
