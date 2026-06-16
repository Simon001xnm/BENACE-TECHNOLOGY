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
    description: 'This is a very good laptop for work that is easy to carry. It is fast and has good security for school or office.',
    specifications: {
      processor: 'Intel Core 7-240H',
      ram: '8GB DDR5',
      storage: '512GB Fast SSD',
      display: '14" Clear Screen',
      graphics: 'Intel Graphics',
      battery: 'Works for 12 Hours',
      weight: 'Very Light (1.4 kg)',
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
    description: 'A very fast computer for work. It has a strong chip and stays on for a long time.',
    specifications: { 
      processor: 'Intel Ultra 7', 
      ram: '8GB', 
      storage: '512GB Fast SSD', 
      display: '14" Clear Screen',
      graphics: 'Intel Arc',
      battery: 'Works for 15 Hours',
      weight: 'Very Light',
      os: 'Ubuntu Linux'
    }, 
    imageId: 'laptop-dell-pro-14-1' 
  },
  { 
    id: 'lpt-hp-830-g8-i7-x360', 
    name: 'Hp 830 G8 i7 x360', 
    brand: 'HP', 
    price: 66700,
    status: 'Ex-UK',
    description: 'A laptop that can fold like a tablet. It has a touch screen and is very fast.',
    specifications: { 
      processor: 'i7 11th Gen', 
      ram: '16GB', 
      storage: '512GB Fast SSD', 
      display: '13.3" Touch Screen',
      graphics: 'Intel Iris',
      battery: 'Works for 10 Hours',
      weight: 'Light',
      os: 'Windows 11'
    }, 
    imageId: 'laptop-hp-830-g8-2' 
  },
  { 
    id: 'lpt-hp-zbf-15-g8-1', 
    name: 'Hp Zbook Firefly 15 G8', 
    brand: 'HP', 
    price: 86250,
    status: 'Ex-UK',
    description: 'A strong laptop for heavy work like design. It has a big screen and lots of memory.',
    specifications: { 
      processor: 'i7 11th Gen', 
      ram: '32GB', 
      storage: '512GB Fast SSD', 
      display: '15.6" Big Screen',
      graphics: 'NVIDIA 4GB Card',
      battery: 'Works for 14 Hours',
      weight: 'Easy to carry',
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
    description: 'A smooth mouse that works without wires. Good for your office work.',
    imageId: 'accessory-dell-mouse-1' 
  },
  { 
    id: 'acc-ups-apc-650', 
    name: 'APC 650VA UPS', 
    brand: 'APC', 
    price: 8000, 
    category: 'Battery Backup', 
    status: 'New',
    description: 'Keeps your computer on when the power goes out. Protects your machine.',
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
