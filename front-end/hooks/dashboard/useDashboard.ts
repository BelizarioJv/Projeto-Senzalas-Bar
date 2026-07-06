"use client";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/services/dashboard.service";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard", "sale"],
    queryFn: getDashboard,
  });
}
