import type StoreType from '../../types/enums/store-type.enum';

export interface CreateStoreRequest {
  address: string;
  type: StoreType;
}

export interface StoreResponse {
  id: number;
  address: string;
  type: StoreType;
}

export interface StoresResponse {
  items: StoreResponse[];
  total: number;
}
