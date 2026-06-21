"use client";
import { useQuery } from "@tanstack/react-query";
import { showSale } from "@/services/sale.service";

export function useGetSale(id: string) {
  //GET - mostrar venda especifica
  return useQuery({
    queryKey: ["sale", id],
    queryFn: () => showSale(id),
    enabled: !!id,
  });
}
