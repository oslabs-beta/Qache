export interface Product {
  id? : string;
  name: string;
  description: string;
  imageUrl: string;
  quantity: number;
  price: number;
  onSale: boolean;
  category: string;
}