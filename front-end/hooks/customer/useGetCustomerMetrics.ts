import { useQuery } from "@tanstack/react-query";
import { customerService } from "@/services/customer.service";

export const useGetCustomerMetrics = () => {
  return useQuery({
    queryKey: ["customerMetrics"],
    queryFn: () => customerService.getMetrics(),
  });
};
