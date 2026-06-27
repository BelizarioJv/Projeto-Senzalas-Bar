// app/produto/[id]/page.tsx
"use client";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { useGetProduct } from "@/hooks/products/useGetProduct";
import { useParams } from "next/navigation";
import { useDeleteProduct } from "@/hooks/products/useDeleteProducts";
import { AppDialog } from "@/components/layout/Dialog";
import { ArrowLeft } from "lucide-react";

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
      setTimeout(() => {
        (router.push("/produtos"), 1000);
      });
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
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-card text-card-foreground border rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="border-b p-8 ">
          <Link href={`/produtos`} className="">
            <ArrowLeft />
          </Link>
          <h1 className="text-4xl p-4 font-bold">{product.name}</h1>

          <div className="flex gap-3 mt-4">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
              {product.category}
            </span>

            {product.brand && (
              <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                {product.brand}
              </span>
            )}
          </div>
        </div>

        {/* Descrição */}
        <div className="p-8 border-b">
          <h2 className="font-semibold text-lg mb-2">Descrição</h2>

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Informações */}
        <div className="grid md:grid-cols-3 gap-6 p-8">
          <div className="rounded-xl border p-5">
            <p className="text-sm text-muted-foreground">Preço de Custo</p>

            <p className="text-2xl font-bold">R$ {product.costPrice}</p>
          </div>

          <div className="rounded-xl border p-5 bg-green-500/10">
            <p className="text-sm text-muted-foreground">Preço de Venda</p>

            <p className="text-3xl font-bold text-green-500">
              R$ {product.salePrice}
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-muted-foreground">Criador por :</p>

            <p className="text-2xl font-bold">{product.usuario?.name}</p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-muted-foreground">Estoque Atual</p>

            <p className="text-2xl font-bold">{product.currentQuantity}</p>
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 p-8 border-t">
          <Link
            href={`/produtos/${id}/edit`}
            className="
              inline-flex
              items-center
              justify-center
              rounded-lg
              bg-primary
              text-primary-foreground
              px-6
              py-2
              font-medium
              hover:opacity-90
              transition
            ">
            Editar Produto
          </Link>

          <AppDialog
            titleButton="Excluir produto"
            titleContent="Excluir produto?"
            description={`Esta ação não pode ser desfeita. O produto ${product.name} será removido.`}
            disabled={deleteMutation.isPending}
            onConfirm={() => deleteProduct(id)}
          />
        </div>
      </div>
    </div>
  );
}
