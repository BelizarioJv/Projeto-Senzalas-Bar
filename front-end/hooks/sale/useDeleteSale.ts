"use client";
import { useQuery } from "@tanstack/react-query";
import { deleteSale } from "@/services/sale.service";

export function useDeleteSale(id: string) {
  return useQuery({
    queryKey: ["sale", id],
    queryFn: () => deleteSale(id),
  });
}
