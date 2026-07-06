"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerService } from "@/services/customer.service";
import { toast } from "sonner";

export function useDeleteCustomer() {
  //POST - excluir cliente
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => customerService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
    onError: (error) => {
      toast.error("Erro ao excluir cliente");

      console.error(error);
    },
  });
}
