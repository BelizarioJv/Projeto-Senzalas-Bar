"use client";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createPurchase } from "@/services/purchase.service";
import { toast } from "sonner";

export function useCreatePurchase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["purchase"],
      });
    },
    onError: (error) => {
      toast.error("Erro ao criar compra");

      console.error(error);
    },
  });
}
