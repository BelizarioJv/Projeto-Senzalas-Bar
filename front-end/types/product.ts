//Tipagem dos dados de produtos
export interface ProductData {
  id: number;
  name: string;
  description?: string;
  categoryId: number;
  brand?: string;
  unitMeasure: "UNIT" | "KG" | "LITER" | "FARDO";
  costPrice: string;
  salePrice: string;
  currentQuantity: number;
  minimumQuantity: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}

export interface ProductUpdate {
  name: string;
  description?: string;
  categoryId: number;
  brand?: string;
  unitMeasure: "UNIT" | "KG" | "LITER" | "FARDO";
  costPrice: number;
  salePrice: number;
  minimumQuantity: number;
}

export interface ProductFormData {
  name: string;
  description?: string;
  categoryId: number;
  brand?: string;
  unitMeasure: "UNIT" | "KG" | "LITER" | "FARDO";
  costPrice: number;
  salePrice: number;
  minimumQuantity: number;
}
