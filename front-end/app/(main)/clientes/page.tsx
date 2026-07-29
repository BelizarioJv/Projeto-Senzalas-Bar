"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { AppCard } from "@/components/layout/AppCard";
import { useAllCustomers } from "@/hooks/customer/useAllCustomers";
import { useGetCustomerMetrics } from "@/hooks/customer/useGetCustomerMetrics"; // Crie este hook se precisar, ou use mock
import { ICustomer } from "@/types/customer";
import { Card } from "@/components/ui/card";
import { Loading } from "@/components/layout/Loading";
import { Error } from "@/components/layout/Error";
import { Users, ArrowLeft, ArrowRight, UserPlus, Search } from "lucide-react";

export default function CustomerPage() {
  const [page, setPage] = useState(1);
  const [onlyDebtors, setOnlyDebtors] = useState<boolean>(false);
  const [searchName, setSearchName] = useState("");

  // Hook de busca de clientes baseado nos filtros no backend
  const customerQuery = useAllCustomers({
    page,
    pageSize: 10,
    name: searchName || undefined,
    onlyDebtors: onlyDebtors || undefined,
  });

  // Hook para buscar as métricas do dashboard do bar (total cadastrados vs devedores)
  const metricsQuery = useGetCustomerMetrics();

  if (customerQuery.isPending) {
    return <Loading message="Buscando Dados" />;
  }

  if (customerQuery.error) {
    toast.error("Erro ao buscar clientes");
    return <Error message="Erro ao buscar Dados" />;
  }

  const { data: customers = [], meta } = customerQuery.data || {
    data: [],
    meta: { totalPages: 1, page: 1 },
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Cabeçalho */}
      <header className="flex flex-col justify-center items-center">
        <div className="flex gap-4 items-center">
          <h1 className="text-4xl font-extrabold text-accent">Clientes</h1>
          <Users size={50} />
        </div>
        <p className="text-gray-500 mt-2">
          Gerencie as contas e saldos dos clientes do bar
        </p>
      </header>

      {/* Cards resumo contendo as métricas que fizemos no transaction */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AppCard
          title="Total Clientes"
          value={metricsQuery.data?.totalCustomers ?? 0}
        />
        <AppCard
          title="Clientes Devedores (Fiado)"
          value={metricsQuery.data?.totalDebtors ?? 0}
        />
      </div>

      {/* Lista de Clientes */}
      <Card className="p-6 shadow-md rounded-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">Lista de clientes</h2>

          {/* Barra de Filtros rápidos */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex items-center">
              <Search className="absolute right-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar por nome..."
                value={searchName}
                onChange={(e) => {
                  setSearchName(e.target.value);
                  setPage(1); // Volta para a primeira página ao filtrar
                }}
                className=" p-3 border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-accent w-64 bg-transparent"
              />
            </div>

            <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyDebtors}
                onChange={(e) => {
                  setOnlyDebtors(e.target.checked);
                  setPage(1);
                }}
                className="rounded text-accent focus:ring-accent h-4 w-4"
              />
              <span>Apenas Devedores</span>
            </label>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse rounded-sm">
            <thead>
              <tr className="bg-accent text-left">
                <th className="p-2">ID</th>
                <th className="p-2">Nome</th>
                <th className="p-2">Telefone</th>
                <th className="p-2">E-mail</th>
                <th className="p-2">Saldo Devedor</th>
                <th className="p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-500">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              ) : (
                customers.map((customer: ICustomer) => (
                  <tr
                    key={customer.id}
                    className="border-b hover:bg-gray-300 transition">
                    <td className="p-2 font-medium">{customer.id}</td>
                    <td className="p-2 text-gray-800 font-semibold">
                      {customer.name}
                    </td>
                    <td className="p-2 text-gray-600">
                      {customer.phone || "—"}
                    </td>
                    <td className="p-2 text-gray-600">
                      {customer.email || "—"}
                    </td>
                    <td className="p-2">
                      <span
                        className={`font-bold ${Number(customer.debtBalance) > 0 ? "text-red-600" : "text-green-600"}`}>
                        R$ {Number(customer.debtBalance).toFixed(2)}
                      </span>
                    </td>
                    <td className="p-2">
                      <Link
                        href={`/clientes/${customer.id}`}
                        className="inline-flex items-center gap-2 px-2 py-1 bg-accent text-accent-foreground rounded-sm hover:bg-gray-30 transition text-sm">
                        Ver Perfil / Pagar
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 bg-accent rounded-sm hover:bg-gray-300 disabled:opacity-50 flex items-center gap-1 text-sm">
            <ArrowLeft size={16} /> Anterior
          </button>
          <span className="text-accent text-sm font-medium">
            Página {meta.page} de {meta.totalPages}
          </span>
          <button
            disabled={page === meta.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-accent rounded-sm hover:bg-gray-300 disabled:opacity-50 flex items-center gap-1 text-sm">
            Próxima <ArrowRight size={16} />
          </button>
        </div>
      </Card>

      {/* Link para Cadastrar Novo Cliente */}
      <div className="text-center">
        <Link
          href="/clientes/form"
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground font-semibold rounded hover:bg-gray-30 transition">
          <UserPlus size={18} /> Novo Cliente
        </Link>
      </div>
    </div>
  );
}
