"use client";
import { AppCard } from "@/components/layout/AppCard";
import { useDashboard } from "@/hooks/dashboard/useDashboard";

export default function DashboardPage() {
  const { data, isPending, error } = useDashboard();
  console.log(data);

  if (isPending) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar dashboard</p>;
  return (
    <>
      <div className="flex flex-col min-h-screen space-y-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AppCard title="Total Produtos" value={data.totalProducts} />

          <AppCard title="Estoque Baixo" value={data.lowStockProducts} />

          <AppCard title="Vendas Hoje" value={data.todaySales} />

          <AppCard title="Vendas do Mês" value={data.monthSales} />
        </div>
      </div>

      <div className="grid md:grid-cols-1 lg:grid-cols-1">
        <AppCard title="Em desenvolvimento" />
      </div>
    </>
  );
}
