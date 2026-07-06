"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useRouter, useParams, notFound } from "next/navigation";
import { useGetCustomer } from "@/hooks/customer/useGetCustomer";
import { useDeleteCustomer } from "@/hooks/customer/useDeleteCustomers";
import { AppDialog } from "@/components/layout/Dialog";
import { ArrowLeft, User, Phone, Mail, Calendar } from "lucide-react";

export default function ClienteDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // Busca os dados do cliente pelo ID
  const { data: customer, isPending, error } = useGetCustomer(id);
  const deleteMutation = useDeleteCustomer();

  async function deleteCustomer(id: string) {
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Cliente excluído com sucesso");
      setTimeout(() => {
        router.push("/clientes");
      }, 1000);
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      toast.error("Não foi possível excluir o cliente");
    }
  }

  // Verificações de Estado da Requisição
  if (isPending)
    return <p className="text-center text-gray-500 py-10">Carregando...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 py-10">Erro ao carregar cliente</p>
    );
  if (!customer) return notFound();

  const balance = Number(customer.debtBalance || 0);
  const isDebtor = balance > 0;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-card text-card-foreground border rounded-2xl shadow-lg overflow-hidden">
        {/* Header (Topo) */}
        <div className="border-b p-8">
          <Link
            href="/clientes"
            className="inline-block mb-4 text-muted-foreground hover:text-foreground transition">
            <ArrowLeft />
          </Link>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <User size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{customer.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Cliente ID: #{customer.id}
              </p>
            </div>
          </div>
        </div>

        {/* Informações Básicas de Contato */}
        <div className="p-8 border-b space-y-4">
          <h2 className="font-semibold text-lg mb-2">Informações de Contato</h2>

          <div className="grid sm:grid-cols-2 gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-accent" />
              <span>{customer.phone || "Nenhum telefone cadastrado"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-accent" />
              <span>{customer.email || "Nenhum e-mail cadastrado"}</span>
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <Calendar size={18} className="text-accent" />
              <span>
                Cadastrado em:{" "}
                {new Date(customer.createdAt).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>
        </div>

        {/* Informações Financeiras (Saldo Devedor / Pendura do Bar) */}
        <div className="grid md:grid-cols-2 gap-6 p-8">
          {/* Card Dinâmico de Saldo Devedor */}
          <div
            className={`rounded-xl border p-5 transition ${
              isDebtor
                ? "bg-red-500/10 border-red-500/30 text-red-900 dark:text-red-200"
                : "bg-green-500/10 border-green-500/30 text-green-900 dark:text-green-200"
            }`}>
            <p className="text-sm font-medium opacity-80">
              Saldo Devedor Atual (Fiado)
            </p>
            <p
              className={`text-3xl font-extrabold mt-2 ${isDebtor ? "text-red-600" : "text-green-600"}`}>
              R$ {balance.toFixed(2)}
            </p>
            <p className="text-xs mt-1 opacity-70">
              {isDebtor
                ? "Este cliente possui contas pendentes no balcão."
                : "Tudo limpo! Nenhuma dívida ativa."}
            </p>
          </div>

          {/* Card Indicativo de Status da Conta */}
          <div className="rounded-xl border p-5 flex flex-col justify-center">
            <p className="text-sm text-muted-foreground">Situação da Conta</p>
            <div className="mt-2">
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isDebtor
                    ? "bg-red-200 text-red-800"
                    : "bg-green-200 text-green-800"
                }`}>
                {isDebtor ? "Em Débito" : "Regularizado"}
              </span>
            </div>
          </div>
        </div>

        {/* Ações (Botões Inferiores) */}

        <div className="flex flex-col sm:flex-row justify-end gap-4 p-8 border-t bg-muted/20">
          <Link
            href={`/clientes/${id}/edit`}
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-2 font-medium hover:opacity-90 transition">
            Editar Cadastro
          </Link>

          {/* Botão para receber o pagamento (Gera a baixa na pendura) */}
          {isDebtor && (
            <AppDialog
              className="bg-yellow-50 text-yellow-900 hover:bg-yellow-100"
              titleButton="Acertar Pagamento"
              titleContent="Acertar pendura do cliente"
              description="Escolha o tipo de pagamento antes de confirmar."
              withSelect
              onConfirm={(tipo) => console.log("Selecionado:", tipo)}
            />
          )}

          <AppDialog
            titleButton="Excluir Cliente"
            titleContent="Excluir cadastro do cliente?"
            description={`Esta ação não pode ser desfeita. O cliente ${customer.name} e seu histórico serão removidos do sistema.`}
            disabled={deleteMutation.isPending}
            onConfirm={() => deleteCustomer(id)}
          />
        </div>
      </div>
    </div>
  );
}
