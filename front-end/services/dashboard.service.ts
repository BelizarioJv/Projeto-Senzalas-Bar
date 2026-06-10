import { api } from "./api";
import { DashboardData } from "@/types/dashboard";

//Buscar dados na api /dashboard
export async function getDashboard(): Promise<DashboardData> {
  const response = await api.get<DashboardData>("/dashboard");

  return response.data;
}
