// app/produto/[id]/page.tsx
"use client";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { notFound, redirect } from "next/navigation";
import { useGetProduct } from "@/hooks/products/useGetProduct";
import { useParams } from "next/navigation";
import { useDeleteProduct } from "@/hooks/products/useDeleteProducts";
import { AppDialog } from "@/components/layout/Dialog";

export default function ProdutoPage() {
  const router = useRouter();
  //Buscando produto pelo Id
  const params = useParams();
  const id = params.id as string;
  const { data: product, isPending, error } = useGetProduct(id);

  const deleteMutation = useDeleteProduct();

  async function deleteProduct(id: string) {
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Produto Excluido com sucesso");
      router.push("/productos");
    } catch (error) {
      console.error("Erro ao exluir produto:", error);
      toast.error("Não foi possível excluir o produto");
    }
  }

  //Verificaçoes
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
          <div className="flex items-center justify-between p-10">
            <p className="text-accent-foreground">{product.description}</p>
            <div className="flex flex-col items-center justify-between">
              <p>Categoria</p>
              <p className="text-accent-foreground">{product.category}</p>
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
            <AppDialog
              titleButton="Excluir produto"
              titleContent="Excluir produto?"
              description="Esta ação não pode ser desfeita. O produto X será removido."
              disabled={deleteMutation.isPending}
              onConfirm={() => deleteProduct(id)}
            />
            <Link
              href={`/produtos/${id}/edit`}
              className="bg-accent-foreground hover:bg-gray-200 text-accent font-semibold py-2 px-4 rounded ">
              Editar Produto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
