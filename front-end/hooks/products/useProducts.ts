"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/product.service";
import { ProductUpdate } from "@/types/product";

export function useProducts(page: number, pageSize: number = 10) {
  const queryClient = useQueryClient();

  // GET - lista de produtos
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(page, pageSize),
  });

  // PUT - atualizar produto
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductUpdate }) =>
      updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // DELETE - remover produto
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    productsQuery,
    updateMutation,
    deleteMutation,
  };
}
