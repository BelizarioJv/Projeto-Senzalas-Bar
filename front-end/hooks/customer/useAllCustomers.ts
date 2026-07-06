"use client";
import { useQuery } from "@tanstack/react-query";
import { customerService } from "@/services/customer.service";
import { ICustomerFilters } from "@/types/customer";

export const useAllCustomers = (filters?: ICustomerFilters) => {
  return useQuery({
    queryKey: ["customers", filters],
    queryFn: () => customerService.getAllWithPagination(filters),
  });
};
