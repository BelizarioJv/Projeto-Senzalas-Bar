import { api } from "@/services/api";
import {
  ICustomerPaginatedResponse,
  ICustomerFilters,
  ICreateCustomerInput,
  ICustomer,
  IDashboardMetricsRequest,
  IDashboardMetricsResponse,
} from "@/types/customer";

export const customerService = {
  // Listar com filtros e paginaçao
  getAllWithPagination: async (filters?: ICustomerFilters) => {
    const response = await api.get<ICustomerPaginatedResponse>("/customer", {
      params: filters,
    });
    return response.data;
  },
  //Listar todos os clientes sem paginação
  getAllCustomers: async () => {
    const response = await api.get<ICustomer[]>("/customer/all");
    return response.data;
  },

  // Buscar cliente por ID
  getById: async (id: string) => {
    const response = await api.get<ICustomer>(`/customer/${id}`);
    return response.data;
  },

  // Atualizar cliente
  update: async (id: string, data: Partial<ICreateCustomerInput>) => {
    const response = await api.put<ICustomer>(`/customer/${id}`, data);
    return response.data;
  },

  // Deletar cliente
  delete: async (id: string) => {
    const response = await api.delete<{ message: string }>(`/customer/${id}`);
    return response.data;
  },

  // Criar cliente
  create: async (data: ICreateCustomerInput) => {
    const response = await api.post<ICustomer>("/customer", data);
    return response.data;
  },

  // Dar baixa/pagar a pendura do bar
  payDebt: async (id: number, amountToPay: number) => {
    const response = await api.post<{ message: string; remainingDebt: number }>(
      `/customer/${id}/pay-debt`,
      { amountToPay },
    );
    return response.data;
  },

  //Dashboard Metricas
  getMetrics: async (
    params?: IDashboardMetricsRequest,
  ): Promise<IDashboardMetricsResponse> => {
    const response = await api.get<IDashboardMetricsResponse>(
      "/customer/customer-metrics",
      {
        params,
      },
    );
    return response.data;
  },
};
