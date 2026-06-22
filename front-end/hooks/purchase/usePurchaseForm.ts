import { useState } from "react";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { PurchaseFormData } from "@/types/purchase";
import { useCreatePurchase } from "./useCreatePurchase";
import { useSupplier } from "@/hooks/supplier/useSupplier";
import { useProducts } from "@/hooks/products/useProducts";

export function usePurchaseForm() {
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const supplierQuery = useSupplier();
  const { productsQuery } = useProducts(1, 1000);
  const createPurchase = useCreatePurchase();

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PurchaseFormData>({
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
    products.reduce((acc, item) => acc + item.quantity * item.price, 0) ?? 0;

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
      toast.success("Compra cadastrada com sucesso!");
      reset();
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar compra");
      toast.error("Erro ao cadastrar compra");
    }
  }

  return {
    register,
    handleSubmit,
    fields,
    products,
    total,
    handleAddProduct,
    onSubmit,
    remove,
    errors,
    productsQuery,
    supplierQuery,
    createPurchase,
    selectedProductId,
    setSelectedProductId,
    quantity,
    setQuantity,
  };
}
