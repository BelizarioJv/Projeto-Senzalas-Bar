"use client";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product.service";
import { ProductFilters } from "@/types/product";
export function useProducts(filters?: ProductFilters) {
  // GET - lista de produtos
  const productsQuery = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
  });

  return {
    productsQuery,
  };
}
