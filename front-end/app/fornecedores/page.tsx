"use client";
import Link from "next/link";
import { toast } from "sonner";
import { SupplierData } from "@/types/supplier";
import { Card } from "@/components/ui/card";
import { Truck } from "lucide-react";
import { useSupplier } from "@/hooks/supplier/useSupplier";
import { useEffect } from "react";

export default function ProductsPage() {
  const { data, isPending, error } = useSupplier();

  // Exibir toast de erro
  useEffect(() => {
    if (error) {
      toast.error("Erro ao buscar fornecedores");
    }
  }, [data]);

  if (isPending) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Cabeçalho */}
      <header className="flex flex-col justify-center items-center">
        <div className="flex gap-4 items-center">
          <h1 className="text-4xl font-extrabold text-accent">Fornecedores</h1>
          <Truck size={50} />
        </div>
        <p className="text-gray-500 mt-2">Gerencie seus fornecedores</p>
      </header>

      {/* Lista de fornecedores */}
      <Card className="p-6 shadow-md rounded-lg">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Lista de Fornecedores</h2>
          {/* filtros e busca podem ser adicionados aqui */}
        </div>
        <table className="w-full border-collapse rounded-sm">
          <thead>
            <tr className="bg-accent text-left">
              <th className="p-2">Nome</th>
              <th className="p-2">Email</th>
              <th className="p-2">Telefone</th>
              <th className="p-2">Endereço</th>
              <th className="p-2">CNPJ</th>
              <th className="p-2">Observações</th>
              <th className="p-2">Açoes</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((supplier: SupplierData) => (
              <tr
                key={supplier.id}
                className="border-b hover:bg-gray-300 transition">
                <td className="p-2 font-medium">{supplier.name}</td>
                <td className="p-2 text-gray-600">{supplier.email}</td>
                <td className="p-2 text-gray-600">{supplier.phone}</td>
                <td className="p-2 text-gray-600">{supplier.address}</td>
                <td className="p-2 text-gray-600">{supplier.cnpj}</td>
                <td className="p-2 text-gray-600">{supplier.observations}</td>
                <td>
                  <Link
                    href={`/fornecedores/${supplier.id}`}
                    className="inline-flex items-center gap-2 px-2 py-1 bg-accent text-accent-foreground rounded-sm hover:bg-gray-300 transition">
                    Ver Fornecedor
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Link para categorias */}
      <div className="text-center">
        <Link
          href="/fornecedores/form"
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent- rounded hover:bg-gray-30 transition">
          Adicionar fornecedor
        </Link>
      </div>
    </div>
  );
}
