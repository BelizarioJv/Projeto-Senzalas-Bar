"use client";
import { useQuery } from "@tanstack/react-query";
import { getMonthlyTotalSales } from "@/services/sale.service";

export function useGetSaleOfMonth() {
  //GET - mostrar numero de produtos vendidos no mês
  return useQuery({
    queryKey: ["purchase", "monthly-total"],
    queryFn: () => getMonthlyTotalSales(),
  });
}
