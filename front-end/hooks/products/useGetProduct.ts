"use client";
import { useQuery } from "@tanstack/react-query";
import { showProduct } from "@/services/product.service";

export function useGetProduct(id: string) {
  //GET - mostrar produto especifico
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => showProduct(id),
    enabled: !!id,
  });
}
