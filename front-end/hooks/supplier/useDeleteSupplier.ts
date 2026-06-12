"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSupplier } from "@/services/supplier.service";
import { toast } from "sonner";

export function useDeleteSupplier() {
  //POST - excluir um Fornecedor
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteSupplier(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["supplier"],
      });
    },
    onError: (error) => {
      toast.error("Erro ao excluir produto");

      console.error(error);
    },
  });
}
