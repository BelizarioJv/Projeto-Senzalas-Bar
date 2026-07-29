"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { AppCard } from "@/components/layout/AppCard";
import { Loading } from "@/components/layout/Loading";
import { Error } from "@/components/layout/Error";
import { useProducts } from "@/hooks/products/useProducts";
import { useGetProductsLowStock } from "@/hooks/products/useGetLowStockProducts";
import { ProductData } from "@/types/product";
import { Card } from "@/components/ui/card";
import { PackageSearch, ArrowLeft, ArrowRight, Search } from "lucide-react";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const { productsQuery } = useProducts({
    page,
    pageSize: 10,
    name: searchName || undefined,
  });

  const lowStockProductsQuery = useGetProductsLowStock();

  if (productsQuery.isPending) {
    return <Loading message="Buscando Dados" />;
  }
  if (productsQuery.error) {
    toast.error("Erro ao buscar produtos");
    return <Error message="Erro ao buscar Dados" />;
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Cabeçalho */}
      <header className="flex flex-col justify-center items-center">
        <div className="flex gap-4 items-center">
          <h1 className="text-4xl font-extrabold text-accent">Produtos</h1>
          <PackageSearch size={50} />
        </div>
        <p className="text-gray-500 mt-2">
          Gerencie seus produtos e categorias
        </p>
      </header>

      {/* Cards resumo */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AppCard
          title="Total Produtos"
          value={productsQuery.data.data.length ?? 0}
        />
        <AppCard
          title="Produtos com estoque baixo"
          value={lowStockProductsQuery.data?.length ?? 0}
        />
      </div>

      {/* Lista de produtos */}
      <Card className="p-6 shadow-md rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">Lista de produtos</h2>

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
          </div>
        </div>
        <table className="w-full border-collapse rounded-sm">
          <thead>
            <tr className="bg-accent text-left ">
              <th className="p-2">Nome</th>
              <th className="p-2">Preço de Custo</th>
              <th className="p-2">Preço de Venda</th>
              <th className="p-2">Categoria</th>
              <th className="p-2">Status</th>
              <th className="p-2">Açoes</th>
            </tr>
          </thead>
          <tbody>
            {productsQuery.data.data.map((product: ProductData) => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-300 transition">
                <td className="p-2 font-medium">{product.name}</td>
                <td className="p-2 text-gray-600">R${product.costPrice}</td>
                <td className="p-2 text-gray-600">R${product.salePrice}</td>
                <td className="p-2 text-gray-600">{product.category}</td>
                <td className="p-2 text-gray-600">{product.status}</td>
                <td>
                  <Link
                    href={`/produtos/${product.id}`}
                    className="inline-flex items-center gap-2 px-2 py-1 bg-accent text-accent-foreground rounded-sm hover:bg-gray-30 transition">
                    Ver Produto
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
            Página {productsQuery.data.meta.totalPages} de{" "}
            {productsQuery.data.meta.page}
          </span>
          <button
            disabled={page === productsQuery.data.meta.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-accent rounded-sm hover:bg-gray-300 disabled:opacity-50">
            <ArrowRight size={20} /> Proxima
          </button>
        </div>
      </Card>

      {/* Link para categorias */}
      <div className="text-center">
        <Link
          href="/produtos/form"
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent- rounded hover:bg-gray-30 transition">
          Adicionar produto
        </Link>
      </div>
    </div>
  );
}
