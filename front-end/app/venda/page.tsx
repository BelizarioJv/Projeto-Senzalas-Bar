"use client";

import Link from "next/link";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useSales } from "@/hooks/sale/useSales";
import { SaleData } from "@/types/sale";
import { AppCard } from "@/components/layout/AppCard";
import { HandCoins, ArrowLeft, ArrowRight } from "lucide-react";

export default function SellPage() {
  const [page, setPage] = useState(1);
  const { saleQuery } = useSales(page, 10);

  if (saleQuery.isPending) {
    return <p className="text-center text-gray-500">Carregando...</p>;
  }
  if (saleQuery.error) {
    return toast.error("Erro ao buscar vendas");
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Cabeçalho */}
      <header className="flex flex-col justify-center items-center">
        <div className="flex gap-4 items-center">
          <h1 className="text-4xl font-extrabold text-accent-foreground">
            Vendas
          </h1>
          <HandCoins size={50} />
        </div>
        <p className="text-gray-500 mt-2">Gerencie suas vendas</p>
      </header>

      {/* Cards resumo */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AppCard title="Total vendas" value={saleQuery.data.data.length ?? 0} />
        <AppCard title="Em desenvolvimento" />
        <AppCard title="Em desenvolvimento" />
        <AppCard title="Em desenvolvimento" />
      </div>

      {/* Lista de vendas */}
      <Card className="p-6 shadow-md rounded-lg">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Lista de Vendas</h2>
          {/* vou colocar os filtros e campos de busca aqui */}
        </div>
        <table className="w-full border-collapse rounded-sm">
          <thead>
            <tr className="bg-accent text-left ">
              <th className="p-2">ID</th>
              <th className="p-2">Data</th>
              <th className="p-2">Metodo Pagamento</th>
              <th className="p-2">Total</th>
              <th className="p-2">Observaçoes</th>
              <th className="p-2">Açoes</th>
            </tr>
          </thead>
          <tbody>
            {saleQuery.data.data.map((sale: SaleData) => (
              <tr
                key={sale.id}
                className="border-b hover:bg-gray-300 transition">
                <td className="p-2 font-medium">{sale.id}</td>
                <td className="p-2 text-gray-600">
                  {new Date(sale.dateTime).toLocaleString("pt-BR")}
                </td>
                <td className="p-2 text-gray-600">{sale.payment}</td>
                <td className="p-2 text-gray-600">R$ {sale.total}</td>
                <td className="p-2 text-gray-600">{sale.observation}</td>
                <td>
                  <Link
                    href={`/venda/${sale.id}`}
                    className="inline-flex items-center gap-2 px-2 py-1 bg-accent text-accent-foreground rounded-sm hover:bg-gray-30 transition">
                    Ver Venda
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginação */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 bg-accent rounded-sm hover:bg-gray-300 disabled:opacity-50">
            <ArrowLeft size={20} /> Anterior
          </button>
          <span className="text-accent">
            Página {saleQuery.data.meta.totalPages} de{" "}
            {saleQuery.data.meta.page}
          </span>
          <button
            disabled={page === saleQuery.data.meta.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-accent rounded-sm hover:bg-gray-300 disabled:opacity-50">
            <ArrowRight size={20} /> Proxima
          </button>
        </div>
      </Card>

      {/* Link para categorias */}
      <div className="text-center">
        <Link
          href="/venda/form"
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent- rounded hover:bg-gray-30 transition">
          Nova Venda
        </Link>
      </div>
    </div>
  );
}
