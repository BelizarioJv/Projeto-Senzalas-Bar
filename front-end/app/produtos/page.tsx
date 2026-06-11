"use client";
import { useState } from "react";
import Link from "next/link";
import { AppCard } from "@/components/layout/AppCard";
import { useProducts } from "@/hooks/products/useProducts";
import { ProductData } from "@/types/product";
import { Card } from "@/components/ui/card";
import { PackageSearch, ArrowLeft, ArrowRight } from "lucide-react";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const { productsQuery } = useProducts(page, 10);

  if (productsQuery.isPending) {
    return <p className="text-center text-gray-500">Carregando...</p>;
  }
  if (productsQuery.error) {
    return (
      <p className="text-center text-red-500">Erro ao carregar produtos</p>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Cabeçalho */}
      <header className="flex flex-col justify-center items-center">
        <div className="flex gap-4 items-center">
          <h1 className="text-4xl font-extrabold text-accent-foreground">
            Produtos
          </h1>
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
        <AppCard title="Em desenvolvimento" />
        <AppCard title="Em desenvolvimento" />
        <AppCard title="Em desenvolvimento" />
      </div>

      {/* Lista de produtos */}
      <Card className="p-6 shadow-md rounded-lg">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Lista de Produtos</h2>
          {/* vou colocar os filtros e campos de busca aqui */}
        </div>
        <table className="w-full border-collapse rounded-sm">
          <thead>
            <tr className="bg-accent text-left ">
              <th className="p-2">Nome</th>
              <th className="p-2">Preço de Custo</th>
              <th className="p-2">Preço de Venda</th>
              <th className="p-2">Categoria</th>
              <th className="p-2">Status</th>
              <th className="p-2"> </th>
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
                <td className="p-2 text-gray-600">R${product.category}</td>
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
