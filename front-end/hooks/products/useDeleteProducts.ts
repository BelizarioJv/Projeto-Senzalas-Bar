"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "@/services/product.service";
import { toast } from "sonner";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteProduct(id),

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
