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
    id: 'lpt-hp-probook-11-g6-1',
    name: 'Hp Probook 11 g6',
    brand: 'HP',
    price: 28000,
    status: 'Ex-UK',
    description: 'Rugged student laptop designed for durability and daily school tasks.',
    specifications: {
      processor: 'Intel Celeron',
      ram: '4GB',
      storage: '128GB SSD',
      display: '11.6" Touch',
      graphics: 'Intel Graphics',
      battery: '8 Hours',
      weight: '1.2 kg',
      os: 'Windows 10'
    },
    imageId: 'laptop-hp-probook-11-g6-1'
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
    id: 'lpt-hp-830-g7-1',
    name: 'Hp EliteBook 830 G7',
    brand: 'HP',
    price: 52000,
    status: 'Ex-UK',
    description: 'Compact and powerful business companion with sleek aluminum design.',
    specifications: {
      processor: 'i5 10th Gen',
      ram: '8GB',
      storage: '256GB SSD',
      display: '13.3" FHD',
      graphics: 'Intel UHD',
      battery: '9 Hours',
      weight: '1.25 kg',
      os: 'Windows 10 Pro'
    },
    imageId: 'laptop-hp-830-g7-1'
  },
  {
    id: 'lpt-hp-830-g8-1',
    name: 'Hp EliteBook 830 G8',
    brand: 'HP',
    price: 64000,
    status: 'Ex-UK',
    description: 'Premium business efficiency in a highly portable 13-inch form factor.',
    specifications: {
      processor: 'i5 11th Gen',
      ram: '16GB',
      storage: '256GB SSD',
      display: '13.3" IPS',
      graphics: 'Intel Iris',
      battery: '10 Hours',
      weight: '1.24 kg',
      os: 'Windows 11'
    },
    imageId: 'laptop-hp-830-g8-1'
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
    id: 'lpt-hp-840-g5-1', 
    name: 'Hp EliteBook 840 G5', 
    brand: 'HP', 
    price: 42000,
    status: 'Ex-UK',
    description: 'A classic business standard featuring robust build quality and easy manageability.',
    specifications: { 
      processor: 'i5 8th Gen', 
      ram: '8GB', 
      storage: '256GB SSD', 
      display: '14" FHD',
      graphics: 'Intel Graphics',
      battery: '7 Hours',
      weight: '1.48 kg',
      os: 'Windows 10'
    }, 
    imageId: 'laptop-hp-840-g5-1' 
  },
  { 
    id: 'lpt-hp-840-g7-1', 
    name: 'Hp EliteBook 840 G7', 
    brand: 'HP', 
    price: 58000,
    status: 'Ex-UK',
    description: 'Refined business laptop with improved cooling and modern connectivity.',
    specifications: { 
      processor: 'i5 10th Gen', 
      ram: '16GB', 
      storage: '256GB SSD', 
      display: '14" FHD',
      graphics: 'Intel UHD',
      battery: '10 Hours',
      weight: '1.33 kg',
      os: 'Windows 10 Pro'
    }, 
    imageId: 'laptop-hp-840-g7-1' 
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
    id: 'lpt-hp-1030-g7-1', 
    name: 'Hp EliteBook x360 1030 G7', 
    brand: 'HP', 
    price: 75000,
    status: 'Ex-UK',
    description: 'Premium 2-in-1 executive laptop with ultra-bright display and elite security.',
    specifications: { 
      processor: 'i7 10th Gen', 
      ram: '16GB', 
      storage: '512GB SSD', 
      display: '13.3" Touch FHD',
      graphics: 'Intel UHD',
      battery: '12 Hours',
      weight: '1.21 kg',
      os: 'Windows 10 Pro'
    }, 
    imageId: 'laptop-hp-1030-g7-1' 
  },
  { 
    id: 'lpt-hp-1030-g8-1', 
    name: 'Hp EliteBook x360 1030 G8', 
    brand: 'HP', 
    price: 98000,
    status: 'Ex-UK',
    description: 'Top-tier executive convertible featuring advanced noise cancellation and 5G ready capability.',
    specifications: { 
      processor: 'i7 11th Gen', 
      ram: '16GB', 
      storage: '512GB SSD', 
      display: '13.3" Touch 4K',
      graphics: 'Intel Iris Xe',
      battery: '13 Hours',
      weight: '1.21 kg',
      os: 'Windows 11 Pro'
    }, 
    imageId: 'laptop-hp-1030-g8-1' 
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
  },
  { 
    id: 'lpt-hp-zbook-firefly-16-g9-1', 
    name: 'Hp Zbook Firefly 16 G9', 
    brand: 'HP', 
    price: 115000,
    status: 'Boxed',
    description: 'Modern 16-inch workstation for creators who need a larger workspace and professional performance.',
    specifications: { 
      processor: 'i7 12th Gen', 
      ram: '16GB', 
      storage: '512GB SSD', 
      display: '16" 16:10 Ratio',
      graphics: 'NVIDIA T550',
      battery: '10 Hours',
      weight: '1.9 kg',
      os: 'Windows 11 Pro'
    }, 
    imageId: 'laptop-hp-zbook-firefly-16-g9-1' 
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
    id: 'lpt-dell-7490-1', 
    name: 'Dell Latitude 7490', 
    brand: 'Dell', 
    price: 38000,
    status: 'Ex-UK',
    description: 'Compact 14-inch business laptop with excellent keyboard and security features.',
    specifications: { 
      processor: 'i5 8th Gen', 
      ram: '8GB', 
      storage: '256GB SSD', 
      display: '14" IPS',
      graphics: 'Intel UHD',
      battery: '7 Hours',
      weight: '1.4 kg',
      os: 'Windows 10'
    }, 
    imageId: 'laptop-dell-7490-1' 
  },
  { 
    id: 'lpt-lenovo-x13-1', 
    name: 'ThinkPad X13 Gen 2', 
    brand: 'Lenovo', 
    price: 72000,
    status: 'Ex-UK',
    description: 'Highly portable business companion with legendary ThinkPad durability and typing experience.',
    specifications: { 
      processor: 'i5 11th Gen', 
      ram: '16GB', 
      storage: '512GB SSD', 
      display: '13.3" 16:10',
      graphics: 'Intel Iris',
      battery: '11 Hours',
      weight: '1.2 kg',
      os: 'Windows 11'
    }, 
    imageId: 'laptop-lenovo-x13-1' 
  },
  { 
    id: 'lpt-macbook-pro-2019-1', 
    name: 'MacBook Pro 16" (2019)', 
    brand: 'Apple', 
    price: 110000,
    status: 'Ex-UK',
    description: 'Powerful creative workstation with Touch Bar and high-fidelity sound system.',
    specifications: { 
      processor: 'Intel Core i7', 
      ram: '16GB', 
      storage: '512GB SSD', 
      display: '16" Retina',
      graphics: 'AMD Radeon Pro',
      battery: '9 Hours',
      weight: '2.0 kg',
      os: 'macOS'
    }, 
    imageId: 'laptop-macbook-pro-2019-1' 
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