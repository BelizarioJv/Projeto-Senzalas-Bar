"use client";
import { useQuery } from "@tanstack/react-query";
import { showPurchase } from "@/services/purchase.service";

export function useGetPurchase(id: string) {
  //GET - mostrar produto especifico
  return useQuery({
    queryKey: ["purchase", id],
    queryFn: () => showPurchase(id),
    enabled: !!id,
  });
}
