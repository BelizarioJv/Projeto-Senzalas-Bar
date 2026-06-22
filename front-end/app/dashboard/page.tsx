"use client";

import { AppCard } from "@/components/layout/AppCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useDashboard } from "@/hooks/dashboard/useDashboard";
import { useStockMovement } from "@/hooks/dashboard/useStockMovement";

export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const stockMovementQuery = useStockMovement(page, 10);
  const dashboardQuery = useDashboard();

  if (dashboardQuery.isPending || stockMovementQuery.isPending) {
    return <p>Carregando...</p>;
  }

  if (dashboardQuery.error || stockMovementQuery.error) {
    return <p>Erro ao carregar dashboard</p>;
  }

  const dashboard = dashboardQuery.data;
  const movements = stockMovementQuery.data.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-muted-foreground">Resumo geral do sistema</p>
      </div>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AppCard title="Total Produtos" value={dashboard.totalProducts} />

        <AppCard title="Estoque Baixo" value={dashboard.lowStockProducts} />

        <AppCard title="Vendas Hoje" value={dashboard.todaySales.toFixed(0)} />

        <AppCard
          title="Vendas do Mês"
          value={dashboard.monthSales.toFixed(0)}
        />
      </div>

      {/* Movimentações */}
      <Card>
        <CardHeader>
          <CardTitle>Últimas Movimentações de Estoque</CardTitle>
        </CardHeader>

        <CardContent>
          {movements.length === 0 ? (
            <p className="text-muted-foreground">
              Nenhuma movimentação encontrada.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-3 text-left">Produto</th>
                    <th className="p-3 text-left">Tipo</th>
                    <th className="p-3 text-left">Quantidade</th>
                    <th className="p-3 text-left">Origem</th>
                    <th className="p-3 text-left">Data</th>
                  </tr>
                </thead>

                <tbody>
                  {movements.map((movement) => (
                    <tr key={movement.id} className="border-b">
                      <td className="p-3">{movement.product?.name}</td>

                      <td className="p-3">
                        <span
                          className={
                            movement.movementType === "ENTRADA"
                              ? "text-green-600 font-medium"
                              : "text-red-600 font-medium"
                          }>
                          {movement.movementType}
                        </span>
                      </td>

                      <td className="p-3">{movement.quantity}</td>

                      <td className="p-3">
                        {movement.purchase
                          ? `Compra #${movement.purchase.id}`
                          : movement.sale
                            ? `Venda #${movement.sale.id}`
                            : "Ajuste"}
                      </td>

                      <td className="p-3">
                        {new Date(movement.createdAt).toLocaleDateString(
                          "pt-BR",
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded-md disabled:opacity-50">
          <ArrowLeft size={18} />
        </button>

        <span>
          Página {stockMovementQuery.data?.meta.page} de{" "}
          {stockMovementQuery.data?.meta.totalPages}
        </span>

        <button
          disabled={page >= (stockMovementQuery.data?.meta.totalPages ?? 1)}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded-md disabled:opacity-50">
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
