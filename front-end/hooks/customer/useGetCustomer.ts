"use client";
import { useQuery } from "@tanstack/react-query";
import { customerService } from "@/services/customer.service";

export const useGetCustomer = (id: string) => {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: () => customerService.getById(id),
    enabled: !!id,
  });
};
