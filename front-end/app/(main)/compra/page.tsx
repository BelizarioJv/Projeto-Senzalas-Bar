"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { AppCard } from "@/components/layout/AppCard";
import { usePurchase } from "@/hooks/purchase/usePurchase";
import { useGetPurchaseOfMonth } from "@/hooks/purchase/useGetTotalPurchaseMonth";
import { PurchaseData } from "@/types/purchase";
import { Card } from "@/components/ui/card";
import { ShoppingCart, ArrowLeft, ArrowRight } from "lucide-react";

export default function PurchasePage() {
  const [page, setPage] = useState(1);
  const { purchaseQuery } = usePurchase(page, 10);
  const totalPurchasesOfMonthQuery = useGetPurchaseOfMonth();

  if (purchaseQuery.isPending) {
    return <p className="text-center text-gray-500">Carregando...</p>;
  }
  if (purchaseQuery.error) {
    return toast.error("Erro ao buscar compras");
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Cabeçalho */}
      <header className="flex flex-col justify-center items-center">
        <div className="flex gap-4 items-center">
          <h1 className="text-4xl font-extrabold text-accent">Compras</h1>
          <ShoppingCart size={50} />
        </div>
        <p className="text-gray-500 mt-2">Gerencie suas compras</p>
      </header>

      {/* Cards resumo */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AppCard
          title="Total Compras"
          value={purchaseQuery.data.data.length ?? 0}
        />
        <AppCard
          title="Total compras Mes ($)"
          text="$"
          value={totalPurchasesOfMonthQuery.data ?? 0}
        />
      </div>

      {/* Lista de compras */}
      <Card className="p-6 shadow-md rounded-lg">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Lista de compras</h2>
          {/* vou colocar os filtros e campos de busca aqui */}
        </div>
        <table className="table-auto  border-collapse rounded-sm  ">
          <thead>
            <tr className="bg-accent text-left ">
              <th className="p-2">ID</th>
              <th className="p-2">Data</th>
              <th className="p-2">Fornecedor</th>
              <th className="p-2">Total</th>
              <th className="p-2">Metodo Pagamento</th>
              <th className="p-2">Açoes</th>
            </tr>
          </thead>
          <tbody>
            {purchaseQuery.data.data.map((purchase: PurchaseData) => (
              <tr
                key={purchase.id}
                className="border-b hover:bg-gray-300 transition">
                <td className="p-2 font-medium">{purchase.id}</td>
                <td className="p-2 text-gray-600">
                  {new Date(purchase.date).toLocaleString("pt-BR")}
                </td>
                <td className="p-2 text-gray-600">
                  {purchase.supplier.name || "—"}
                </td>
                <td className="p-2 text-gray-600">R${purchase.total}</td>
                <td className="p-2 text-gray-600">{purchase.payment}</td>
                <td>
                  <Link
                    href={`/compra/${purchase.id}`}
                    className="inline-flex items-center gap-2 px-2 py-1 bg-accent text-accent-foreground rounded-sm hover:bg-gray-30 transition">
                    Ver Compra
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
            Página {purchaseQuery.data.meta.totalPages} de{" "}
            {purchaseQuery.data.meta.page}
          </span>
          <button
            disabled={page === purchaseQuery.data.meta.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-accent rounded-sm hover:bg-gray-300 disabled:opacity-50">
            <ArrowRight size={20} /> Proxima
          </button>
        </div>
      </Card>

      {/* Link para categorias */}
      <div className="text-center">
        <Link
          href="/compra/form"
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent- rounded hover:bg-gray-30 transition">
          Nova compra
        </Link>
      </div>
    </div>
  );
}
