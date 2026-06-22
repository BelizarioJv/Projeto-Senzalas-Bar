import { api } from "./api";
import { DashboardData, StockMovement } from "@/types/dashboard";
import { MetaData } from "@/types/metaDataPage";

export interface StockMovementResponse {
  data: StockMovement[];
  meta: MetaData;
}

//Buscar dados na api /dashboard
export async function getDashboard(): Promise<DashboardData> {
  const response = await api.get<DashboardData>("/dashboard");

  return response.data;
}

export async function getStockMovement(
  page = 1,
  pageSize = 10,
): Promise<StockMovementResponse> {
  const response = await api.get<StockMovementResponse>(
    `/dashboard/stock-movement?page=${page}&pageSize=${pageSize}`,
  );

  return response.data;
}
