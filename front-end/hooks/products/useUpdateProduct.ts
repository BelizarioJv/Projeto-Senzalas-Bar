"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "@/services/product.service";
import { ProductData } from "@/types/product";
import { toast } from "sonner";

export function useUpdateProduct() {
  //PUT - atualizar dados produto
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductData }) =>
      updateProduct(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error) => {
      toast.error("Erro ao excluir produto");

      console.error(error);
    },
  });
}
