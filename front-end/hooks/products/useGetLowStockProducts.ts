"use client";
import { useQuery } from "@tanstack/react-query";
import { getProductsLowStock } from "@/services/product.service";

export function useGetProductsLowStock() {
  return useQuery({
    queryKey: ["products", "low-stock"],
    queryFn: getProductsLowStock,
  });
}
