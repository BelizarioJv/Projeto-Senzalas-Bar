export interface filtersReportRequest {
  startDate?: string;
  endDate?: string;
}

//Interface para o relatório de compras mensais
export interface monthlyPurchasesReportResponse {
  totalPurchases: number;
  totalAmount: number;
  data: {
    id: number;
    createdAt: string;
    total: number;
    supplier: {
      id: number;
      name: string;
    };
    products: {
      product: {
        id: number;
        name: string;
      };
      quantity: number;
      price: number;
    }[];
  }[];
}

//Interface para o relatório de vendas mensais
export interface monthlySalesReportResponse {
  totalSales: number;
  totalAmount: number;
  data: {
    id: number;
    createdAt: string;
    total: number;
    customer: {
      id: number;
      name: string;
    };
    products: {
      product: {
        id: number;
        name: string;
      };
      quantity: number;
      price: number;
    }[];
  }[];
}

//Interface para o relatório financeiro
export interface financialReportResponse {
  totalPurchases: number;
  totalSales: number;
  totalAmountPurchases: number;
  totalAmountSales: number;
  netProfit: number;
}

//Interface para o relatório de inventário
export interface topSellingProductsReportResponse {
  data: {
    productId: number;
    productName: string;
    totalQuantitySold: number;
    totalRevenue: number;
  }[];
}
