//Modelo principal do Cliente (Reflete exatamente o que vem do Banco de Dados)
export interface ICustomer {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  debtBalance: number | string; // O Prisma/Postgres envia Decimal como string às vezes, é bom precaver
  createdAt: string;
  updatedAt: string;
}

//Interface para os dados necessários na CRIAÇÃO de um cliente
export interface ICreateCustomerInput {
  name: string;
  phone?: string | null;
  email?: string | null;
}

//Interface para os dados de ATUALIZAÇÃO de um cliente (Todos os campos se tornam opcionais)
export interface IUpdateCustomerInput {
  name?: string;
  phone?: string | null;
  email?: string | null;
}

//Parâmetros de busca, paginação e filtro para a listagem de clientes
export interface ICustomerFilters {
  page?: number;
  pageSize?: number;
  name?: string;
  sortBy?: "name" | "createdAt" | "debtBalance";
  order?: "asc" | "desc";
  /** Se true, o backend retornará apenas os clientes com conta pendurada */
  onlyDebtors?: boolean;
}

//Estrutura da resposta paginada enviada pelo seu controller (index)
export interface ICustomerPaginatedResponse {
  data: ICustomer[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface IDashboardMetricsRequest {
  startDate: string;
  endDate: string;
  customerId?: number;
}

//Resposta do endpoint de métricas do Dashboard do Bar
export interface IDashboardMetricsResponse {
  totalCustomers: number;
  totalDebtors: number;
}
