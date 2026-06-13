"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { PurchaseFormData } from "@/types/purchase";
import { useSupplier } from "@/hooks/supplier/useSupplier";
import { useCreatePurchase } from "@/hooks/purchase/useCreatePurchase";

export default function CreatePurchaseForm() {
  const supplierQuery = useSupplier();
  const createPurchase = useCreatePurchase();

  const { register, control, handleSubmit, watch, reset } =
    useForm<PurchaseFormData>({
      defaultValues: {
        supplierId: 0,
        payment: "PIX",
        status: "PENDENTE",
        products: [
          {
            productId: 0,
            quantity: 1,
            price: 0,
          },
        ],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const products = watch("products") ?? [];

  const total =
    products?.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0) ?? 0;

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

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Nova Compra</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Fornecedor */}
        <div>
          <label className="block mb-2">Fornecedor</label>

          <select
            {...register("supplierId", {
              valueAsNumber: true,
            })}
            className="w-full border rounded p-2">
            <option value="">Selecione</option>

            {supplierQuery.data?.data.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        {/* Pagamento */}
        <div>
          <label className="block mb-2">Forma de Pagamento</label>

          <select
            {...register("payment")}
            className="w-full border rounded p-2">
            <option value="DINHEIRO">Dinheiro</option>
            <option value="PIX">PIX</option>
            <option value="CARTAO_CREDITO">Cartão Crédito</option>
            <option value="CARTAO_DEBITO">Cartão Débito</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block mb-2">Status</label>

          <select {...register("status")} className="w-full border rounded p-2">
            <option value="PENDENTE">Pendente</option>

            <option value="COMPLETO">Completo</option>

            <option value="CANCELADO">Cancelado</option>
          </select>
        </div>

        {/* Produtos */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Produtos</h2>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-5 gap-3 border rounded p-4">
              {/* Produto */}
              <select
                {...register(`products.${index}.productId`, {
                  valueAsNumber: true,
                })}
                className="border rounded p-2">
                <option value="">Selecione um produto</option>

                {productsQuery.data?.data.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>

              {/* Quantidade */}
              <input
                type="number"
                min="1"
                placeholder="Qtd"
                className="border rounded p-2"
                {...register(`products.${index}.quantity`, {
                  valueAsNumber: true,
                })}
              />

              {/* Preço */}
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Preço"
                className="border rounded p-2"
                {...register(`products.${index}.price`, {
                  valueAsNumber: true,
                })}
              />

              {/* Subtotal */}
              <div className="flex items-center justify-center font-semibold">
                R${" "}
                {(
                  (products[index]?.quantity || 0) *
                  (products[index]?.price || 0)
                ).toFixed(2)}
              </div>

              {/* Remover */}
              <button
                type="button"
                disabled={fields.length === 1}
                onClick={() => remove(index)}
                className="bg-red-500 text-white rounded px-3 py-2 disabled:opacity-50">
                Remover
              </button>
            </div>
          ))}
        </div>

        {/* Adicionar Produto */}
        <button
          type="button"
          onClick={() =>
            append({
              productId: 0,
              quantity: 1,
              price: 0,
            })
          }
          className="bg-blue-500 text-white px-4 py-2 rounded">
          Adicionar Produto
        </button>

        {/* Total */}
        <div className="text-2xl font-bold">Total: R$ {total.toFixed(2)}</div>

        {/* Salvar */}
        <button
          type="submit"
          disabled={createPurchase.isPending}
          className="bg-green-600 text-white px-6 py-3 rounded">
          {createPurchase.isPending ? "Salvando..." : "Salvar Compra"}
        </button>
      </form>
    </div>
  );
}
