"use client";
import { useQuery } from "@tanstack/react-query";
import { getPurchase } from "@/services/purchase.service";

export function usePurchase(page: number, pageSize: number = 10) {
  // GET - lista de produtos
  const purchaseQuery = useQuery({
    queryKey: ["purchase"],
    queryFn: () => getPurchase(page, pageSize),
  });

  return {
    purchaseQuery,
  };
}
