"use client";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createSale } from "@/services/sale.service";
import { SaleFormData } from "@/types/sale";
import { toast } from "sonner";

export function useCreateSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sale"],
      });
    },
    onError: (error) => {
      toast.error("Erro ao criar venda");

      console.error(error);
    },
  });
}
