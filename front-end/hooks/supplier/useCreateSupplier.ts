"use client";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createSupplier } from "@/services/supplier.service";
import { toast } from "sonner";

export function useCreateSupplier() {
  const queryClient = useQueryClient();
  //POST - CRIAR FORNECEDOR
  return useMutation({
    mutationFn: createSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["supplier"],
      });
    },
    onError: (error) => {
      toast.error("Erro ao Criar produto");

      console.error(error);
    },
  });
}
