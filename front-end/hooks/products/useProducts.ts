"use client";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product.service";

export function useProducts(page: number, pageSize: number = 10) {
  // GET - lista de produtos
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(page, pageSize),
  });

  return {
    productsQuery,
  };
}
