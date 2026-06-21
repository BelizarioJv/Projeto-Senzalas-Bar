"use client";
import { useQuery } from "@tanstack/react-query";
import { getSale } from "@/services/sale.service";

export function useSales(page: number, pageSize: number = 10) {
  //GET - lista de vendas
  const saleQuery = useQuery({
    queryKey: ["sale"],
    queryFn: () => getSale(page, pageSize),
  });

  return {
    saleQuery,
  };
}
