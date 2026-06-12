"use client";
import { useQuery } from "@tanstack/react-query";
import { getSuppliers } from "@/services/supplier.service";

export function useSupplier() {
  return useQuery({
    queryKey: ["supplier"],
    queryFn: getSuppliers,
  });
}
