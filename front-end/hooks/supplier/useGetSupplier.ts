"use client";
import { useQuery } from "@tanstack/react-query";
import { showSupplier } from "@/services/supplier.service";

export function useGetSupplier(id: string) {
  //GET - mostrar fornedor especifico
  return useQuery({
    queryKey: ["supplier", id],
    queryFn: () => showSupplier(id),
    enabled: !!id,
  });
}
