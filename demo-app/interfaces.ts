export interface Product {
  id?: string;
  name: string;
  description: string;
  imageUrl: string;
  quantity: number;
  price: number;
  onSale: boolean;
  category: string;
}

export interface Metric {
  [Bedroom:string]: {
    labels: string[];
    data: number[];
  },
  Mattresses: {
    labels: string[];
    data: number[];
  },
  Furniture: {
    labels: string[];
    data: number[];
  },
  Storage: {
    labels: string[];
    data: number[];
  },
  "Living Room": {
    labels: string[];
    data: number[];
  },
  Kitchen: {
    labels: string[];
    data: number[];
  },
  Bathroom: {
    labels: string[];
    data: number[];
  },
  Appliances: {
    labels: string[];
    data: number[];
  },
  Couches: {
    labels: string[];
    data: number[];
  }
}
