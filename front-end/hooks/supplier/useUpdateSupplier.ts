"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSupplier } from "@/services/supplier.service";
import { SupplierData } from "@/types/supplier";
import { toast } from "sonner";

export function useUpdateSupplier() {
  //PUT - atualizar dados fornecedor
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: SupplierData }) =>
      updateSupplier(id, data),

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
