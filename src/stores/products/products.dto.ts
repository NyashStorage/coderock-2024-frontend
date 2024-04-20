import type { CategoryResponse } from '../categories/categories.dto';

export interface CreateProductRequest {
  title: string;
  description: string;
  photo: string;
  price: number;
  weight: number;
  length: number;
  height: number;
  depth: number;
  category: number;
  amount: Record<number, number>;
}

export interface EditProductRequest {
  id: number;
  title?: string;
  description?: string;
  photo?: string;
  price?: number;
  weight?: number;
  length?: number;
  height?: number;
  depth?: number;
  category?: number;
  enabled?: boolean;
  amount?: Record<number, number>;
}

export interface ProductResponse {
  id: number;
  title: string;
  description: string;
  photo: string;
  price: number;
  properties: {
    weight: number;
    length: number;
    height: number;
    depth: number;
  };
  category: CategoryResponse;
  owner: {
    companyName: string;
  };
}

export interface ProductsResponse {
  items: ProductResponse[];
  total: number;
}

export interface MyProductResponse {
  id: number;
  title: string;
  description: string;
  photo: string;
  price: number;
  properties: {
    weight: number;
    length: number;
    height: number;
    depth: number;
  };
  category: CategoryResponse;
  enabled: boolean;
  amount: Record<number, number>;
}

export interface MyProductsResponse {
  items: MyProductResponse[];
  total: number;
}
