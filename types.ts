
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface CatalogState {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
}
