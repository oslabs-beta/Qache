import { Component } from 'react';

export interface Product {
  id?: string;
  name: string;
  description: string;
  imageUrl: string;
  quantity: number;
  price: number;
  onSale: boolean;
  category: string;
  inCart: boolean;
  // onClick?: (event: React.MouseEventHandler<HTMLButtonElement>) => void;
}

export interface AddButton {
  onClick: React.MouseEventHandler;
}

export interface RemoveButton {
  onClick: React.MouseEventHandler;
}

export interface Metric {
  labels?: string[];
  data?: number[];

  Bedroom?: {
    labels: string[];
    data: number[];
  };
  Mattresses?: {
    labels: string[];
    data: number[];
  };
  Furniture?: {
    labels: string[];
    data: number[];
  };
  Storage?: {
    labels: string[];
    data: number[];
  };
  'Living Room'?: {
    labels: string[];
    data: number[];
  };
  Kitchen?: {
    labels: string[];
    data: number[];
  };
  Bathroom?: {
    labels: string[];
    data: number[];
  };
  Appliances?: {
    labels: string[];
    data: number[];
  };
  Couches?: {
    labels: string[];
    data: number[];
  };
  Deals?: {
    labels: string[];
    data: number[];
  };
  Cart?: {
    labels: string[];
    data: number[];
  }
}

export interface Item {
  title: string;
  path: string;
  icon: Component;
  cName?: string;
  iconClosed?: Component;
  iconOpened?: Component;
  subNav?: Item[] | undefined;
}

export interface Dataset {
  label: string;
  fill: boolean;
  lineTension: number;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  data: number[] | undefined;
}
