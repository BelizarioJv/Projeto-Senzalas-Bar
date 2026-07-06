import { useQueryClient, useMutation } from "@tanstack/react-query";
import { customerService } from "@/services/customer.service";
import { ICreateCustomerInput } from "@/types/customer";

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
    onError: (error) => {
      console.error("Erro ao criar cliente:", error);
    },
  });
};
