"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { PurchaseFormData } from "@/types/purchase";
import { ProductData } from "@/types/product";
import { useSupplier } from "@/hooks/supplier/useSupplier";
import { useProducts } from "@/hooks/products/useProducts";
import { useCreatePurchase } from "@/hooks/purchase/useCreatePurchase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreatePurchaseForm() {
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const supplierQuery = useSupplier();
  const { productsQuery } = useProducts(1, 1000);
  const createPurchase = useCreatePurchase();

  const { register, control, handleSubmit, watch, reset, setValue } =
    useForm<PurchaseFormData>({
      defaultValues: {
        supplierId: 0,
        payment: "PIX",
        status: "PENDENTE",
        products: [],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const products = watch("products") ?? [];

  const total =
    products.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0) ?? 0;

  function handleAddProduct() {
    const product = productsQuery.data?.data.find(
      (p) => p.id === Number(selectedProductId),
    );

    if (!product) return;

    const existingIndex = fields.findIndex(
      (item) => item.productId === product.id,
    );

    if (existingIndex >= 0) {
      const currentQty = watch(`products.${existingIndex}.quantity`);

      setValue(`products.${existingIndex}.quantity`, currentQty + quantity);

      setSelectedProductId("");
      setQuantity(1);

      return;
    }

    append({
      productId: product.id,
      quantity,
      price: Number(product.costPrice),
    });

    setSelectedProductId("");
    setQuantity(1);
  }
  async function onSubmit(data: PurchaseFormData) {
    try {
      await createPurchase.mutateAsync(data);

      alert("Compra cadastrada com sucesso!");

      reset();
    } catch (error) {
      console.error(error);

      alert("Erro ao cadastrar compra");
    }
  }

  if (productsQuery.isLoading) {
    return <p>Carregando produtos...</p>;
  }

  if (productsQuery.isError) {
    return <p>Erro ao carregar produtos.</p>;
  }
  return (
    <div className="container mx-auto max-w-7xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Nova Compra</CardTitle>

          <CardDescription>
            Cadastre uma nova entrada de produtos
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Dados da Compra */}
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="text-sm font-medium">Fornecedor</label>

                <select
                  {...register("supplierId", {
                    valueAsNumber: true,
                  })}
                  className="
                    mt-1
                    h-10
                    w-full
                    rounded-md
                    border
                    bg-background
                    px-3
                  ">
                  <option value="">Selecione</option>

                  {supplierQuery.data?.data.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Forma de Pagamento
                </label>

                <select
                  {...register("payment")}
                  className="
                    mt-1
                    h-10
                    w-full
                    rounded-md
                    border
                    bg-background
                    px-3
                  ">
                  <option value="DINHEIRO">Dinheiro</option>

                  <option value="PIX">PIX</option>

                  <option value="CARTAO_CREDITO">Cartão Crédito</option>

                  <option value="CARTAO_DEBITO">Cartão Débito</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Status</label>

                <select
                  {...register("status")}
                  className="
                    mt-1
                    h-10
                    w-full
                    rounded-md
                    border
                    bg-background
                    px-3
                  ">
                  <option value="PENDENTE">Pendente</option>

                  <option value="COMPLETO">Completo</option>
                </select>
              </div>
            </div>

            {/* Produtos */}
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Produto</CardTitle>
              </CardHeader>

              <CardContent className="flex gap-4">
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="
                    h-10
                    flex-1
                    rounded-md
                    border
                    bg-background
                    px-3
                  ">
                  <option value="">Selecione um produto</option>

                  {productsQuery.data?.data.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - R$
                      {Number(product.costPrice).toFixed(2)}
                    </option>
                  ))}
                </select>

                <Input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-32"
                />

                <Button type="button" onClick={handleAddProduct}>
                  Adicionar
                </Button>
              </CardContent>
            </Card>

            {/* Carrinho */}
            <Card>
              <CardHeader>
                <CardTitle>Carrinho</CardTitle>

                <CardDescription>Produtos adicionados à compra</CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                {fields.length === 0 && (
                  <p className="text-muted-foreground text-sm">
                    Nenhum produto adicionado.
                  </p>
                )}

                {fields.map((field, index) => {
                  const product = productsQuery.data?.data.find(
                    (p) => p.id === field.productId,
                  );
                  const item = products[index];

                  return (
                    <div
                      key={field.id}
                      className="
                        flex
                        items-center
                        justify-between
                        border
                        rounded-lg
                        p-4
                      ">
                      <div>
                        <p className="font-medium">{product?.name}</p>

                        <p className="text-sm text-muted-foreground">
                          {item?.quantity} x R$
                          {Number(item?.price || 0).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-semibold">
                          R$
                          {(
                            Number(item?.quantity || 0) *
                            Number(item?.price || 0)
                          ).toFixed(2)}
                        </span>

                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => remove(index)}>
                          Remover
                        </Button>
                      </div>

                      <input
                        type="hidden"
                        {...register(`products.${index}.productId`)}
                      />

                      <input
                        type="hidden"
                        {...register(`products.${index}.quantity`)}
                      />

                      <input
                        type="hidden"
                        {...register(`products.${index}.price`)}
                      />
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Resumo */}
            <Card>
              <CardContent className="py-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg text-muted-foreground">
                    Total da Compra
                  </span>

                  <span className="text-3xl font-bold">
                    R$ {total.toFixed(2)}
                  </span>
                </div>

                <Button
                  className="mt-6 w-full"
                  size="lg"
                  type="submit"
                  disabled={createPurchase.isPending}>
                  {createPurchase.isPending ? "Salvando..." : "Salvar Compra"}
                </Button>
              </CardContent>
            </Card>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
