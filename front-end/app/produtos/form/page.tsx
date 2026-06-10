"use client";

import { useForm } from "react-hook-form";
import { useCreateProduct } from "@/hooks/products/useCreateProducts";

export default function CreateProductPage() {
  const { register, handleSubmit } = useForm();

  const createProduct = useCreateProduct();

  async function onSubmit(data: any) {
    await createProduct.mutateAsync(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("name")} placeholder="Nome" />

      <button type="submit">Salvar</button>
    </form>
  );
}
