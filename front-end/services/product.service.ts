import { api } from "./api";
import { ProductData, ProductUpdate } from "@/types/product";

interface MetaData {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ProductResponse {
  data: ProductData[];
  meta: MetaData;
}

//Buscar produtos na api /products
export async function getProducts(
  page: number,
  pageSize: number,
): Promise<ProductResponse> {
  const response = await api.get<ProductResponse>("/products", {
    params: { page, pageSize },
  });
  return response.data;
}

//Buscar produto especifico
export async function showProduct(id: string): Promise<ProductData> {
  const response = await api.get<ProductData>(`/products/${id}`);
  return response.data;
}

//Criar produtos
export async function createProduct(data: ProductData) {
  const response = await api.post<ProductData>("/products", data);

  return response.data;
}

//Atualizar produto
export async function updateProduct(id: string, data: ProductUpdate) {
  const response = await api.put<ProductUpdate>(`/products/${id}`, data);

  return response.data;
}

//Deletar produto
export async function deleteProduct(id: string) {
  const response = await api.delete<ProductData>(`/products/${id}`);

  return response.data;
}
