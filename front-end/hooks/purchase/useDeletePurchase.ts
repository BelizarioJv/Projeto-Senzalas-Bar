"use client";
import { useQuery } from "@tanstack/react-query";
import { deletePurchase } from "@/services/purchase.service";

export function useDeletePurchase(id: string) {
  return useQuery({
    queryKey: ["purchase", id],
    queryFn: () => deletePurchase(id),
  });
}
