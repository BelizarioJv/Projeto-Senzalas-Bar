import { api } from "@/services/api";
import { handleAxiosError } from "@/utils/handleAxiosError";
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
    try {
      const response = await api.get<ICustomerPaginatedResponse>("/customer", {
        params: filters,
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  //Listar todos os clientes sem paginação
  getAllCustomers: async () => {
    try {
      const response = await api.get<ICustomer[]>("/customer/all");
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  // Buscar cliente por ID
  getById: async (id: string) => {
    try {
      const response = await api.get<ICustomer>(`/customer/${id}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  // Atualizar cliente
  update: async (id: string, data: Partial<ICreateCustomerInput>) => {
    try {
      const response = await api.put<ICustomer>(`/customer/${id}`, data);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  // Deletar cliente
  delete: async (id: string) => {
    try {
      const response = await api.delete<{ message: string }>(`/customer/${id}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  // Criar cliente
  create: async (data: ICreateCustomerInput) => {
    try {
      const response = await api.post<ICustomer>("/customer", data);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  // Dar baixa/pagar a pendura do bar
  payDebt: async (id: number, amountToPay: number) => {
    try {
      const response = await api.post<{
        message: string;
        remainingDebt: number;
      }>(`/customer/${id}/pay-debt`, { amountToPay });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  //Dashboard Metricas
  getMetrics: async (
    params?: IDashboardMetricsRequest,
  ): Promise<IDashboardMetricsResponse> => {
    try {
      const response = await api.get<IDashboardMetricsResponse>(
        "/customer/customer-metrics",
        {
          params,
        },
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
};
