//Tipagem dos dados de Dashboard
export interface DashboardData {
  totalProducts: number;
  lowStockProducts: number;
  todaySales: number;
  monthSales: number;
}

export interface StockMovement {
  id: number;
  movementType: "ENTRADA" | "SAIDA" | "AJUSTE";
  quantity: number;
  observations?: string | null;

  productId: number;
  purchaseId?: number | null;
  saleId?: number | null;

  createdAt: string;

  product: {
    id: number;
    name: string;
    category: string;
  };

  purchase?: {
    id: number;
    total: number;
    date: string;
  } | null;

  sale?: {
    id: number;
    total: number;
    dateTime: string;
  } | null;
}
