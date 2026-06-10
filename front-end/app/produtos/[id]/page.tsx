// app/produto/[id]/page.tsx
"use client";
import { notFound } from "next/navigation";
import { useProduct } from "@/hooks/products/useGetProduct";
import { useParams } from "next/navigation";

export default function ProdutoPage() {
  const params = useParams();
  const id = params.id as string;

  // Exemplo: simulação de dados do produto
  const { data: product, isPending, error } = useProduct(id);
  if (isPending) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar produto</p>;
  if (!product) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className=" bg-accent rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold text-accent-foreground">
            {product.name}
          </h1>
          <div className="flex items-center justify-between p-6">
            <p className="text-accent-foreground">{product.description}</p>
            <div className="flex flex-col items-center justify-between">
              <p>Categoria</p>
              <p className="text-accent-foreground">{product.categoryId}</p>
            </div>
            <p className="text-accent-foreground">{product.brand || ""}</p>
          </div>

          <div className="flex items-center justify-between p-6">
            <span className="text-xl font-semibold text-green-400">
              Preço de custo : R$ {product.costPrice}
            </span>
            <span className="text-xl text-accent-foreground">
              Preço de venda : R$ {product.salePrice}
            </span>
            <span className="text-xl text-accent-foreground">
              Estoque: {product.currentQuantity}
            </span>
          </div>

          <div className="flex items-center justify-center gap-6">
            {/* <button className="bg-accent-foreground hover:bg-gray-400 text-accent font-semibold py-2 px-4 rounded">
              Copiar produto
            </button> */}
            <button className="bg-accent-foreground hover:bg-gray-400 text-accent font-semibold py-2 px-4 rounded">
              Excluir produto
            </button>
            <button className="bg-accent-foreground hover:bg-gray-400 text-accent font-semibold py-2 px-4 rounded">
              Atualizar Produto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
