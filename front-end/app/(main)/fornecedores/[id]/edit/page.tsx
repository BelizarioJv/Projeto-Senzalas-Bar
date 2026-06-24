"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGetSupplier } from "@/hooks/supplier/useGetSupplier";
import { useUpdateSupplier } from "@/hooks/supplier/useUpdateSupplier";
import { useParams } from "next/navigation";
import { SupplierData } from "@/types/supplier";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, ArrowLeft } from "lucide-react";

export default function UpdateSupplierPage() {
  const router = useRouter();
  //Buscando produto pelo Id
  const params = useParams();
  const id = params.id as string;
  const { data: supplier, isPending, error } = useGetSupplier(id);

  const updateMutation = useUpdateSupplier();

  //Verificaçoes
  if (isPending) <p>Carregando...</p>;
  if (error) <p>Erro ao carregar produto</p>;
  if (!supplier) notFound();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SupplierData>({
    values: supplier,
  });

  useEffect(() => {
    if (supplier) {
      reset(supplier);
    }
  }, [supplier, reset]);

  async function onSubmit(data: SupplierData) {
    try {
      await updateMutation.mutateAsync({ id, data });

      toast.success("fornecedor atualizado com sucesso!");
      router.replace("/fornecedores");
    } catch (error) {
      console.error("Erro ao atualizar fornecedor:", error);
      toast.error("Não foi possível atualizar o fornecedor. Tente novamente.");
    } finally {
      reset(data);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Card para adicionar fornecedor */}
      <Card>
        <CardHeader>
          <div className="flex gap-4">
            <Link href={`/fornecedores`} className="">
              <ArrowLeft />
            </Link>
            <CardTitle>Editar Fornecedor</CardTitle>
            <Truck />
          </div>
        </CardHeader>

        <CardContent>
          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="name">Nome</Label>
              {/*Nome */}
              <Input
                id="name"
                {...register("name", {
                  required: "Nome obrigatório",
                })}
              />

              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              {/*Email */}
              <Input
                type="email"
                id="email"
                placeholder="fornecedor@gmail.com"
                {...register("email", {})}
              />

              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Telefone</Label>
              {/*Telefone */}
              <Input
                type="phone"
                id="phone"
                placeholder="(31) 9 9999-9999"
                {...register("phone", {})}
              />

              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="address">Endereço</Label>
              {/*Endereço */}
              <Input
                id="address"
                placeholder="fornecedor@gmail.com"
                {...register("address", {})}
              />

              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="cnpj">Cnpj</Label>
              {/*Cnpj */}
              <Input
                id="cnpj"
                placeholder="20.631.800.0001-01"
                {...register("cnpj", {})}
              />

              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              {/* Observaçoes */}
              <Label htmlFor="observations">Observaçoes</Label>

              <Textarea
                id="observations"
                placeholder="Descrição do fornecedor..."
                {...register("observations")}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={updateMutation.isPending}>
              {updateMutation.isPending
                ? "Salvando edição..."
                : "Editar Fornecedor"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
