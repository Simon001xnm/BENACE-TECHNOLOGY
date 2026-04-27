import type { Laptop, Service, PortfolioProject, Accessory } from '@/lib/types';
import { Code, Brush, ShoppingCart } from 'lucide-react';

export const laptops: Laptop[] = [
  {
    id: 'lpt-001',
    name: 'ZenBook Pro 15',
    brand: 'Asus',
    price: 179999,
    specifications: {
      processor: 'Intel Core i9',
      ram: '32GB DDR4',
      storage: '1TB NVMe SSD',
      display: '15.6" 4K UHD OLED',
    },
    imageId: 'laptop-1',
  },
  {
    id: 'lpt-002',
    name: 'Spectre x360 14',
    brand: 'HP',
    price: 154999,
    specifications: {
      processor: 'Intel Core i7',
      ram: '16GB DDR4',
      storage: '512GB NVMe SSD',
      display: '13.5" 3K2K OLED',
    },
    imageId: 'laptop-4',
  },
  {
    id: 'lpt-003',
    name: 'MacBook Air M2',
    brand: 'Apple',
    price: 119900,
    specifications: {
      processor: 'Apple M2 Chip',
      ram: '8GB Unified',
      storage: '256GB SSD',
      display: '13.6" Liquid Retina',
    },
    imageId: 'laptop-3',
  },
  {
    id: 'lpt-004',
    name: 'Legion 5 Pro',
    brand: 'Lenovo',
    price: 199999,
    specifications: {
      processor: 'AMD Ryzen 7',
      ram: '16GB DDR5',
      storage: '1TB NVMe SSD',
      display: '16" QHD 165Hz',
    },
    imageId: 'laptop-2',
  },
  {
    id: 'lpt-005',
    name: 'XPS 15',
    brand: 'Dell',
    price: 219900,
    specifications: {
      processor: 'Intel Core i7',
      ram: '16GB DDR5',
      storage: '512GB NVMe SSD',
      display: '15.6" FHD+',
    },
    imageId: 'laptop-5',
  },
  {
    id: 'lpt-006',
    name: 'Surface Laptop 4',
    brand: 'Microsoft',
    price: 129999,
    specifications: {
      processor: 'AMD Ryzen 5',
      ram: '8GB DDR4',
      storage: '256GB SSD',
      display: '13.5" PixelSense',
    },
    imageId: 'laptop-7',
  },
  {
    id: 'lpt-007',
    name: 'Gram 17',
    brand: 'LG',
    price: 169999,
    specifications: {
      processor: 'Intel Core i7',
      ram: '16GB LPDDR5',
      storage: '1TB NVMe SSD',
      display: '17" WQXGA IPS',
    },
    imageId: 'laptop-8',
  },
  {
    id: 'lpt-008',
    name: 'Chromebook Spin 713',
    brand: 'Acer',
    price: 64900,
    specifications: {
      processor: 'Intel Core i5',
      ram: '8GB DDR4',
      storage: '256GB SSD',
      display: '13.5" 2K VertiView',
    },
    imageId: 'laptop-6',
  },
];

export const services: Service[] = [
  {
    id: 'srv-01',
    title: 'Custom Website Development',
    description:
      'We build bespoke websites from the ground up, tailored to your brand identity and business goals. Perfect for businesses needing a unique digital presence.',
    icon: Code,
  },
  {
    id: 'srv-02',
    title: 'E-commerce Solutions',
    description:
      'Robust, scalable, and secure online stores that drive sales and provide a seamless customer experience. We integrate payment gateways, shipping, and more.',
    icon: ShoppingCart,
  },
  {
    id: 'srv-03',
    title: 'UI/UX Design & Branding',
    description:
      'Our design process focuses on creating intuitive, engaging, and beautiful user interfaces that reflect your brand and delight your users.',
    icon: Brush,
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'prj-01',
    title: 'Aura Fashion Co.',
    description:
      'A sleek, minimalist e-commerce platform for a high-end fashion brand, featuring a custom lookbook and seamless checkout.',
    category: 'E-commerce',
    imageId: 'portfolio-1',
  },
  {
    id: 'prj-02',
    title: 'Nexus Financial',
    description:
      'A professional and trustworthy corporate site for a financial advisory firm, with integrated blog and client resources.',
    category: 'Corporate',
    imageId: 'portfolio-2',
  },
  {
    id: 'prj-03',
    title: 'Creative Canvas',
    description:
      "A visually-driven portfolio for a digital artist, focusing on a gallery-style layout and high-impact visuals.",
    category: 'Portfolio',
    imageId: 'portfolio-3',
  },
  {
    id: 'prj-04',
    title: 'Wanderlust Travels',
    description:
      'An interactive travel booking site with dynamic destination guides and a user-friendly trip planning interface.',
    category: 'Platform',
    imageId: 'portfolio-4',
  },
];

export const accessories: Accessory[] = [
  {
    id: 'acc-001',
    name: 'MX Master 3S Wireless Mouse',
    brand: 'Logitech',
    price: 9999,
    imageId: 'accessory-1',
    category: 'Mouse',
  },
  {
    id: 'acc-002',
    name: 'Keychron K2 Mechanical Keyboard',
    brand: 'Keychron',
    price: 8999,
    imageId: 'accessory-2',
    category: 'Keyboard',
  },
  {
    id: 'acc-003',
    name: 'WH-1000XM5 Wireless Headphones',
    brand: 'Sony',
    price: 39999,
    imageId: 'accessory-3',
    category: 'Headphones',
  },
  {
    id: 'acc-004',
    name: 'Anker 737 Power Bank',
    brand: 'Anker',
    price: 14999,
    imageId: 'accessory-4',
    category: 'Power',
  },
];
