"use client";
import { useQuery } from "@tanstack/react-query";
import { getStockMovement } from "@/services/dashboard.service";
import { StockMovement } from "@/types/dashboard";

export function useStockMovement(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["stock-movement", page, pageSize],

    queryFn: () => getStockMovement(page, pageSize),

    placeholderData: (previousData) => previousData,
  });
}
