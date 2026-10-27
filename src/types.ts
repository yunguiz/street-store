export type GenderFilter = 'ALL' | 'MASCULINO' | 'FEMININO' | 'UNISSEX';

export type ProductCategory = 
  | 'ROUPAS' 
  | 'CALÇADOS' 
  | 'ACESSÓRIOS' 
  | 'NOVIDADES' 
  | 'MARCAS';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  gender: 'MASCULINO' | 'FEMININO' | 'UNISSEX';
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  badge?: string;
  sizes: string[];
  description: string;
  details: string[];
  isFeatured?: boolean;
  inStock?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}