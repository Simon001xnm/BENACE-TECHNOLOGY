import type { Laptop, Service, PortfolioProject, Accessory } from '@/lib/types';
import { Code, Brush, ShoppingCart, Wrench, Shield, Zap } from 'lucide-react';

export const laptops: Laptop[] = [
  { 
    id: 'lpt-lenovo-thinkbook-14-irl-1',
    name: 'ThinkBook 14-IRL',
    brand: 'Lenovo',
    price: 105000,
    oldPrice: 125000,
    salePercentage: 16,
    status: 'Boxed',
    description: 'The Lenovo ThinkBook 14-IRL is a sophisticated 14-inch business laptop designed to bridge the gap between high-end performance and everyday portability. Engineered for modern professionals and university students, it delivers the speed and security required for a fast-paced digital environment.',
    specifications: {
      processor: 'Intel Core 7-240H',
      ram: '8GB DDR5',
      storage: '512GB PCIe Gen4 SSD',
      display: '14" WUXGA (1920x1200) 300 nits'
    },
    imageId: 'laptop-lenovo-thinkbook-14-irl-1'
  },
  { 
    id: 'lpt-dell-pro-14-1', 
    name: 'Dell Pro 14 PC14250', 
    brand: 'Dell', 
    price: 156250, 
    oldPrice: 180000,
    salePercentage: 13,
    status: 'New',
    description: 'High-performance professional workstation with the latest Intel Core Ultra processing. Ideal for engineering, data analysis, and creative workflows.',
    specifications: { 
      processor: 'Intel Core Ultra 7 265U', 
      ram: '8GB', 
      storage: '512GB SSD', 
      display: '14" FHD' 
    }, 
    imageId: 'laptop-dell-pro-14-1' 
  },
  { 
    id: 'lpt-hp-830-g8-1', 
    name: 'Hp 830 G8', 
    brand: 'HP', 
    price: 72500, 
    status: 'Ex-UK',
    description: 'A premium enterprise-grade 2-in-1 laptop. The x360 hinge allows for tablet mode, perfect for presentations and creative work.',
    specifications: { 
      processor: 'i7 11th gen', 
      ram: '16gb', 
      storage: '512ssd', 
      display: '13.3" x360 Touch' 
    }, 
    imageId: 'laptop-hp-830-g8-1' 
  },
  { 
    id: 'lpt-macbook-pro-2019-1', 
    name: 'Macbook pro 2019', 
    brand: 'Apple', 
    price: 75000, 
    oldPrice: 95000,
    salePercentage: 21,
    status: 'Ex-UK',
    description: 'The classic 16-inch powerhouse. Features the stunning Retina display and dedicated Radeon graphics for video editing.',
    specifications: { 
      processor: 'Intel Core i7', 
      ram: '16gb', 
      storage: '512ssd', 
      display: '16" Retina with Radeon Pro' 
    }, 
    imageId: 'laptop-macbook-pro-2019-1' 
  },
];

export const accessories: Accessory[] = [
  { 
    id: 'acc-ups-apc-1', 
    name: 'APC 650VA UPS', 
    brand: 'APC', 
    price: 8000, 
    oldPrice: 10000,
    salePercentage: 20,
    category: 'UPS', 
    status: 'New',
    description: 'Reliable power protection for your home and office electronics.',
    imageId: 'ups-placeholder' 
  },
  { 
    id: 'acc-prn-can-1', 
    name: 'Canon MG2541S Printer', 
    brand: 'Canon', 
    price: 6500, 
    category: 'Printers', 
    status: 'New',
    description: 'Compact and affordable all-in-one printer, scanner, and copier.',
    imageId: 'printer-placeholder' 
  },
  { 
    id: 'acc-sw-kas-1', 
    name: 'Kaspersky Standard 1 user', 
    brand: 'Kaspersky', 
    price: 2200, 
    oldPrice: 3500,
    salePercentage: 37,
    category: 'Software', 
    status: 'New',
    description: 'Essential antivirus protection for your PC.',
    imageId: 'software-placeholder' 
  },
];

export const services: Service[] = [
  {
    id: 'srv-01',
    title: 'Custom Website Development',
    description: 'We build high-performance, bespoke websites tailored to your brand. From corporate landing pages to complex web applications.',
    icon: Code,
  },
  {
    id: 'srv-02',
    title: 'Professional PC & Laptop Repair',
    description: 'Expert hardware and software diagnostics. We handle screen replacements, hinge repairs, and motherboard issues.',
    icon: Wrench,
  },
  {
    id: 'srv-03',
    title: 'IT Consulting & Support',
    description: 'Guiding businesses through digital transformation. We provide infrastructure setup and software licensing.',
    icon: Zap,
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'prj-01',
    title: 'Aura Fashion Co.',
    description: 'A sleek, minimalist e-commerce platform for a high-end fashion brand.',
    category: 'E-commerce',
    imageId: 'portfolio-1',
  },
  {
    id: 'prj-02',
    title: 'Nexus Financial',
    description: 'A professional and trustworthy corporate site for a financial advisory firm.',
    category: 'Corporate',
    imageId: 'portfolio-2',
  },
];
