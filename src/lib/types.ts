import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export type Laptop = {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  salePercentage?: number;
  status?: 'New' | 'Ex-UK' | 'Boxed';
  description?: string;
  specifications: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
  };
  imageId: string;
  imageUrls?: string[];
  type?: 'laptop' | 'accessory';
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
};

export type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  imageId: string;
  category: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageId: string;
  imageUrls?: string[];
};

export type CartableProduct = {
  id: string;
  name: string;
  price: number;
  imageId: string;
  imageUrls?: string[];
};

export type Accessory = {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  imageId: string;
  imageUrls?: string[];
  description?: string;
  oldPrice?: number;
  salePercentage?: number;
  status?: 'New' | 'Ex-UK' | 'Boxed';
  type?: 'laptop' | 'accessory';
};
