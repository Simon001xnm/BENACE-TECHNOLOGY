import type { Laptop, Service, PortfolioProject, Accessory } from '@/lib/types';
import { Code, ShoppingCart, Wrench, Zap } from 'lucide-react';

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
      display: '14" WUXGA (1920x1200) 300 nits',
      graphics: 'Intel Iris Xe Graphics',
      battery: 'Up to 12 Hours',
      weight: '1.4 kg',
      os: 'Windows 11 Pro'
    },
    imageId: 'laptop-lenovo-thinkbook-14-irl-1'
  },
  { 
    id: 'lpt-dell-pro-14-1', 
    name: 'Dell Pro 14 (PC14250)', 
    brand: 'Dell', 
    price: 143750,
    status: 'New',
    description: 'High-performance professional workstation with Ultra 7 processing and ProSupport.',
    specifications: { 
      processor: 'Intel Core Ultra 7 256U', 
      ram: '8GB', 
      storage: '512GB SSD', 
      display: '14" FHD',
      graphics: 'Intel Arc Graphics',
      battery: 'Up to 15 Hours',
      weight: '1.36 kg',
      os: 'Ubuntu Linux'
    }, 
    imageId: 'laptop-dell-pro-14-1' 
  },
  { 
    id: 'lpt-hp-830-g8-i7-x360', 
    name: 'Hp 830 G8 i7 x360 Convertible', 
    brand: 'HP', 
    price: 66700,
    status: 'Ex-UK',
    description: 'Top-of-the-line convertible with powerful i7 processing and touch display.',
    specifications: { 
      processor: 'i7 11th Gen', 
      ram: '16GB', 
      storage: '512GB SSD', 
      display: '13.3" Touch x360',
      graphics: 'Intel Iris Xe',
      battery: 'Up to 10 Hours',
      weight: '1.31 kg',
      os: 'Windows 11'
    }, 
    imageId: 'laptop-hp-830-g8-2' 
  },
  { 
    id: 'lpt-hp-zbf-15-g8-1', 
    name: 'Hp Zbook Firefly 15 G8 Workstation', 
    brand: 'HP', 
    price: 86250,
    status: 'Ex-UK',
    description: 'Professional mobile workstation with dedicated 4GB graphics.',
    specifications: { 
      processor: 'i7 11th Gen', 
      ram: '32GB', 
      storage: '512GB SSD', 
      display: '15.6" FHD',
      graphics: 'NVIDIA T500 4GB',
      battery: 'Up to 14 Hours',
      weight: '1.75 kg',
      os: 'Windows 11 Pro'
    }, 
    imageId: 'laptop-hp-zbook-firefly-15-g8-1' 
  }
];

export const accessories: Accessory[] = [
  { 
    id: 'acc-dell-mouse-wireless', 
    name: 'Original Dell Mouse wireless', 
    brand: 'Dell', 
    price: 1955,
    category: 'Mouse', 
    status: 'New',
    description: 'Precision wireless mouse from Dell for seamless productivity.',
    imageId: 'accessory-dell-mouse-1' 
  },
  { 
    id: 'acc-ups-apc-650', 
    name: 'APC 650VA UPS', 
    brand: 'APC', 
    price: 8000, 
    category: 'UPS', 
    status: 'New',
    description: 'Reliable power protection for your home and office electronics.',
    imageId: 'ups-placeholder' 
  }
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
