"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerService } from "@/services/customer.service";
import { IUpdateCustomerInput } from "@/types/customer";
import { toast } from "sonner";

export function useUpdateCustomer() {
  //PUT - atualizar dados cliente
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateCustomerInput }) =>
      customerService.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
    onError: (error) => {
      toast.error("Erro ao editar cliente");

      console.error(error);
    },
  });
}
