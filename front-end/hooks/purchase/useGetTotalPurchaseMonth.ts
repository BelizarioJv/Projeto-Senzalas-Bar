"use client";
import { useQuery } from "@tanstack/react-query";
import { getTotalPurchasesOfMonth } from "@/services/purchase.service";

export function useGetPurchaseOfMonth() {
  //GET - mostrar numero de produtos comprados no mês
  return useQuery({
    queryKey: ["purchase", "monthly-total"],
    queryFn: () => getTotalPurchasesOfMonth(),
  });
}
