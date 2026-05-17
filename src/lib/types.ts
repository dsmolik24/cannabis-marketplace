export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: ProductCategory;
  strain: StrainType;
  thc: number;
  cbd: number;
  weight: string;
  image: string;
  dispensaryId: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export type ProductCategory =
  | "flower"
  | "edibles"
  | "concentrates"
  | "vaporizers"
  | "topicals"
  | "pre-rolls"
  | "tinctures"
  | "accessories";

export type StrainType = "sativa" | "indica" | "hybrid" | "cbd";

export interface Dispensary {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: string;
  image: string;
  rating: number;
  reviewCount: number;
  license: string;
  delivery: boolean;
  pickup: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  medicalCard?: string;
}
