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
    description: 'High-performance business laptop with Intel Core 7 processing. Optimized for security and portability.',
    specifications: {
      processor: 'Intel Core 7-240H',
      ram: '8GB DDR5',
      storage: '512GB Fast SSD',
      display: '14" Clear Screen',
      graphics: 'Intel Graphics',
      battery: '12 Hours',
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
    description: 'Professional workstation featuring the latest Intel Ultra chip for intensive workloads.',
    specifications: { 
      processor: 'Intel Ultra 7', 
      ram: '8GB', 
      storage: '512GB Fast SSD', 
      display: '14" FHD+',
      graphics: 'Intel Arc',
      battery: '15 Hours',
      weight: '1.3 kg',
      os: 'Ubuntu Linux'
    }, 
    imageId: 'laptop-dell-pro-14-1' 
  },
  { 
    id: 'lpt-hp-dragonfly-1', 
    name: 'Hp Elite Dragonfly G2', 
    brand: 'HP', 
    price: 95000,
    status: 'Ex-UK',
    description: 'Ultra-lightweight premium business laptop with a stunning touch display and long battery life.',
    specifications: { 
      processor: 'i7 11th Gen', 
      ram: '16GB', 
      storage: '512GB SSD', 
      display: '13.3" Touch 4K',
      graphics: 'Intel Iris Xe',
      battery: '13 Hours',
      weight: '0.99 kg',
      os: 'Windows 11 Pro'
    }, 
    imageId: 'laptop-hp-dragonfly-1' 
  },
  { 
    id: 'lpt-hp-830-g8-2', 
    name: 'Hp EliteBook 830 G8 x360', 
    brand: 'HP', 
    price: 66700,
    status: 'Ex-UK',
    description: 'Convertible 2-in-1 laptop that folds into a tablet. Perfect for creatives and presentations.',
    specifications: { 
      processor: 'i7 11th Gen', 
      ram: '16GB', 
      storage: '512GB SSD', 
      display: '13.3" Touch Screen',
      graphics: 'Intel Iris',
      battery: '10 Hours',
      weight: '1.2 kg',
      os: 'Windows 11'
    }, 
    imageId: 'laptop-hp-830-g8-2' 
  },
  { 
    id: 'lpt-hp-840-g8-1', 
    name: 'Hp EliteBook 840 G8', 
    brand: 'HP', 
    price: 78000,
    status: 'Ex-UK',
    description: 'Industry-leading business laptop known for reliability, security, and exceptional build quality.',
    specifications: { 
      processor: 'i5 11th Gen', 
      ram: '16GB', 
      storage: '256GB SSD', 
      display: '14" FHD',
      graphics: 'Intel Iris',
      battery: '11 Hours',
      weight: '1.35 kg',
      os: 'Windows 11 Pro'
    }, 
    imageId: 'laptop-hp-840-g8-1' 
  },
  { 
    id: 'lpt-lenovo-thinkbook-14-g8-1',
    name: 'ThinkBook 14 G8',
    brand: 'Lenovo',
    price: 92000,
    status: 'New',
    description: 'Modern business laptop with essential features for productivity and collaboration.',
    specifications: {
      processor: 'Intel Core i5',
      ram: '16GB',
      storage: '512GB SSD',
      display: '14" IPS',
      graphics: 'Intel UHD',
      battery: '10 Hours',
      weight: '1.5 kg',
      os: 'Windows 11'
    },
    imageId: 'laptop-lenovo-thinkbook-14-g8-1'
  },
  { 
    id: 'lpt-dell-latitude-5400-1', 
    name: 'Dell Latitude 5400', 
    brand: 'Dell', 
    price: 45000,
    status: 'Ex-UK',
    description: 'Dependable business laptop with a focus on manageability and connectivity.',
    specifications: { 
      processor: 'i5 8th Gen', 
      ram: '8GB', 
      storage: '256GB SSD', 
      display: '14" HD',
      graphics: 'Intel Graphics',
      battery: '8 Hours',
      weight: '1.6 kg',
      os: 'Windows 10 Pro'
    }, 
    imageId: 'laptop-dell-latitude-5400-1' 
  },
  { 
    id: 'lpt-hp-zbook-firefly-15-g8-1', 
    name: 'Hp Zbook Firefly 15 G8', 
    brand: 'HP', 
    price: 86250,
    status: 'Ex-UK',
    description: 'A strong mobile workstation for heavy work like design. Features professional graphics.',
    specifications: { 
      processor: 'i7 11th Gen', 
      ram: '32GB', 
      storage: '512GB SSD', 
      display: '15.6" Big Screen',
      graphics: 'NVIDIA 4GB Card',
      battery: '14 Hours',
      weight: '1.7 kg',
      os: 'Windows 11 Pro'
    }, 
    imageId: 'laptop-hp-zbook-firefly-15-g8-1' 
  }
];

export const accessories: Accessory[] = [
  { 
    id: 'acc-dell-mouse-wireless', 
    name: 'Original Dell Wireless Mouse', 
    brand: 'Dell', 
    price: 1955,
    category: 'Mouse', 
    status: 'New',
    description: 'Ergonomic wireless mouse with precise tracking for daily office use.',
    imageId: 'accessory-dell-mouse-1' 
  },
  { 
    id: 'acc-ups-apc-650', 
    name: 'APC 650VA UPS', 
    brand: 'APC', 
    price: 8000, 
    category: 'Power', 
    status: 'New',
    description: 'Battery backup and surge protection for sensitive electronics.',
    imageId: 'printer-placeholder' 
  }
];

export const services: Service[] = [
  {
    id: 'srv-01',
    title: 'We Build Websites',
    description: 'We make websites for your business that work well on all phones and computers.',
    icon: Code,
  },
  {
    id: 'srv-02',
    title: 'We Fix Laptops',
    description: 'We fix broken screens, keys that do not work, and internal problems. We use good parts.',
    icon: Wrench,
  },
  {
    id: 'srv-03',
    title: 'Computer Help',
    description: 'We help you get the right computers and set them up correctly.',
    icon: Zap,
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'prj-01',
    title: 'Aura Fashion Co.',
    description: 'A clean website for a fashion shop to sell clothes online.',
    category: 'Online Shop',
    imageId: 'portfolio-1',
  },
  {
    id: 'prj-02',
    title: 'Nexus Financial',
    description: 'A professional website for a business that gives money advice.',
    category: 'Business',
    imageId: 'portfolio-2',
  },
];