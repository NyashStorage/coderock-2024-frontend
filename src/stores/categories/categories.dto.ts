export interface CategoryResponse {
  id: number;
  title: string;
}

export interface CategoriesResponse {
  items: CategoryResponse[];
  total: number;
}
