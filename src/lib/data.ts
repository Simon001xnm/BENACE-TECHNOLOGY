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
      display: '14" WUXGA (1920x1200) 300 nits'
    },
    imageId: 'laptop-lenovo-thinkbook-14-irl-1'
  },
  { 
    id: 'lpt-dell-pro-14-1', 
    name: 'Dell Pro 14 (PC14250)', 
    brand: 'Dell', 
    price: 143750, // 125000 * 1.15
    status: 'New',
    description: 'High-performance professional workstation with Ultra 7 processing and ProSupport.',
    specifications: { 
      processor: 'Intel Core Ultra 7 256U', 
      ram: '8GB', 
      storage: '512GB SSD', 
      display: '14" Ubuntu' 
    }, 
    imageId: 'laptop-dell-pro-14-1' 
  },
  { 
    id: 'lpt-lenovo-tb-14-g8-1', 
    name: 'Lenovo ThinkBook 14 G8', 
    brand: 'Lenovo', 
    price: 126500, // 110000 * 1.15
    status: 'New',
    description: 'Modern Arctic Grey business laptop with the latest Ultra 7 processor.',
    specifications: { 
      processor: 'Ultra 7 255H', 
      ram: '16GB', 
      storage: '512GB SSD', 
      display: '14" FHD' 
    }, 
    imageId: 'laptop-lenovo-thinkbook-14-g8-1' 
  },
  { 
    id: 'lpt-hp-probook-11-g6-1', 
    name: 'Hp Probook 11 g6', 
    brand: 'HP', 
    price: 16100, // 14000 * 1.15
    status: 'Ex-UK',
    description: 'Reliable student laptop built for durability and daily school tasks.',
    specifications: { 
      processor: 'Core i5', 
      ram: '8GB', 
      storage: '128GB SSD', 
      display: '11.6" HD' 
    }, 
    imageId: 'laptop-hp-probook-11-g6-1' 
  },
  { 
    id: 'lpt-hp-dragonfly-1', 
    name: 'Hp Dragonfly x360', 
    brand: 'HP', 
    price: 43700, // 38000 * 1.15
    status: 'Ex-UK',
    description: 'Ultra-lightweight premium business convertible with stunning design.',
    specifications: { 
      processor: 'Core i5 8th Gen', 
      ram: '8GB', 
      storage: '256GB SSD', 
      display: '13.3" Touch x360' 
    }, 
    imageId: 'laptop-hp-dragonfly-1' 
  },
  { 
    id: 'lpt-hp-830-g7-i5', 
    name: 'Hp 830 G7 i5', 
    brand: 'HP', 
    price: 35650, // 31000 * 1.15
    status: 'Ex-UK',
    description: 'Enterprise grade 13-inch laptop with sleek aluminum chassis.',
    specifications: { 
      processor: 'i5 10th Gen', 
      ram: '16GB', 
      storage: '256GB SSD', 
      display: '13.3" FHD' 
    }, 
    imageId: 'laptop-hp-830-g7-1' 
  },
  { 
    id: 'lpt-hp-830-g7-i7', 
    name: 'Hp 830 G7 i7 Touch', 
    brand: 'HP', 
    price: 46000, // 40000 * 1.15
    status: 'Ex-UK',
    description: 'High-performance 13-inch touch enabled business workstation.',
    specifications: { 
      processor: 'i7 10th Gen', 
      ram: '16GB', 
      storage: '256GB SSD', 
      display: '13.3" FHD Touch' 
    }, 
    imageId: 'laptop-hp-830-g7-2' 
  },
  { 
    id: 'lpt-hp-830-g8-i5', 
    name: 'Hp 830 G8 i5', 
    brand: 'HP', 
    price: 34500, // 30000 * 1.15
    status: 'Ex-UK',
    description: 'Modern 11th Gen business laptop with excellent build quality.',
    specifications: { 
      processor: 'i5 11th Gen', 
      ram: '8GB', 
      storage: '256GB SSD', 
      display: '13.3" FHD' 
    }, 
    imageId: 'laptop-hp-830-g8-1' 
  },
  { 
    id: 'lpt-hp-830-g8-i7-x360', 
    name: 'Hp 830 G8 i7 x360', 
    brand: 'HP', 
    price: 66700, // 58000 * 1.15
    status: 'Ex-UK',
    description: 'Top-of-the-line convertible with powerful i7 processing and touch display.',
    specifications: { 
      processor: 'i7 11th Gen', 
      ram: '16GB', 
      storage: '512GB SSD', 
      display: '13.3" Touch x360' 
    }, 
    imageId: 'laptop-hp-830-g8-2' 
  },
  { 
    id: 'lpt-hp-830-g8-i7-touch', 
    name: 'Hp 830 G8 i7 Touch', 
    brand: 'HP', 
    price: 55200, // 48000 * 1.15
    status: 'Ex-UK',
    description: 'Fast and responsive 13-inch business laptop with touch capabilities.',
    specifications: { 
      processor: 'i7 11th Gen', 
      ram: '16GB', 
      storage: '512GB SSD', 
      display: '13.3" FHD Touch' 
    }, 
    imageId: 'laptop-hp-830-g8-3' 
  },
  { 
    id: 'lpt-hp-840-g5-1', 
    name: 'Hp 840 G5', 
    brand: 'HP', 
    price: 27600, // 24000 * 1.15
    status: 'Ex-UK',
    description: 'Classic 14-inch professional laptop, perfect for office work.',
    specifications: { 
      processor: 'i5 7th Gen', 
      ram: '8GB', 
      storage: '256GB SSD', 
      display: '14" FHD' 
    }, 
    imageId: 'laptop-hp-840-g5-1' 
  },
  { 
    id: 'lpt-hp-840-g7-1', 
    name: 'Hp 840 G7', 
    brand: 'HP', 
    price: 34500, // 30000 * 1.15
    status: 'Ex-UK',
    description: 'Slim and powerful 14-inch business laptop for mobile professionals.',
    specifications: { 
      processor: 'i5 10th Gen', 
      ram: '16GB', 
      storage: '256GB SSD', 
      display: '14" FHD' 
    }, 
    imageId: 'laptop-hp-840-g7-1' 
  },
  { 
    id: 'lpt-hp-840-g8-8gb', 
    name: 'Hp 840 G8 8GB', 
    brand: 'HP', 
    price: 37375, // 32500 * 1.15
    status: 'Ex-UK',
    description: 'Modern 14-inch enterprise laptop with 10th Gen performance.',
    specifications: { 
      processor: 'i5 10th Gen', 
      ram: '8GB', 
      storage: '256GB SSD', 
      display: '14" FHD' 
    }, 
    imageId: 'laptop-hp-840-g8-1' 
  },
  { 
    id: 'lpt-hp-840-g8-16gb', 
    name: 'Hp 840 G8 16GB', 
    brand: 'HP', 
    price: 39100, // 34000 * 1.15
    status: 'Ex-UK',
    description: 'Upgraded 14-inch business laptop with 11th Gen i5 and 16GB RAM.',
    specifications: { 
      processor: 'i5 11th Gen', 
      ram: '16GB', 
      storage: '256GB SSD', 
      display: '14" FHD' 
    }, 
    imageId: 'laptop-hp-840-g8-2' 
  },
  { 
    id: 'lpt-hp-1030-g7-16gb', 
    name: 'Hp 1030 G7 16GB x360', 
    brand: 'HP', 
    price: 63250, // 55000 * 1.15
    status: 'Ex-UK',
    description: 'Premium EliteBook x360 with i7 power and compact design.',
    specifications: { 
      processor: 'i7 10th Gen', 
      ram: '16GB', 
      storage: '512GB SSD', 
      display: '13.3" Touch x360' 
    }, 
    imageId: 'laptop-hp-1030-g7-1' 
  },
  { 
    id: 'lpt-hp-1030-g7-32gb', 
    name: 'Hp 1030 G7 32GB x360', 
    brand: 'HP', 
    price: 63250, // 55000 * 1.15
    status: 'Ex-UK',
    description: 'Maximum memory for heavy multitasking in a stunning convertible.',
    specifications: { 
      processor: 'i7 10th Gen', 
      ram: '32GB', 
      storage: '256GB SSD', 
      display: '13.3" Touch x360' 
    }, 
    imageId: 'laptop-hp-1030-g7-2' 
  },
  { 
    id: 'lpt-hp-1030-g8-1', 
    name: 'Hp 1030 G8 x360', 
    brand: 'HP', 
    price: 59800, // 52000 * 1.15
    status: 'Ex-UK',
    description: 'The ultimate 13-inch business convertible with 11th Gen i7.',
    specifications: { 
      processor: 'i7 11th Gen', 
      ram: '16GB', 
      storage: '256GB SSD', 
      display: '13.3" Touch x360' 
    }, 
    imageId: 'laptop-hp-1030-g8-1' 
  },
  { 
    id: 'lpt-hp-1040-g8-1', 
    name: 'Hp 1040 G8 x360', 
    brand: 'HP', 
    price: 66700, // 58000 * 1.15
    status: 'Ex-UK',
    description: 'Stunning 14-inch flagship business convertible.',
    specifications: { 
      processor: 'i7 11th Gen', 
      ram: '16GB', 
      storage: '512GB SSD', 
      display: '14" Touch x360' 
    }, 
    imageId: 'laptop-hp-1040-g8-1' 
  },
  { 
    id: 'lpt-hp-zbf-15-g8-1', 
    name: 'Hp Zbook Firefly 15 G8', 
    brand: 'HP', 
    price: 86250, // 75000 * 1.15
    status: 'Ex-UK',
    description: 'Professional mobile workstation with dedicated 4GB graphics.',
    specifications: { 
      processor: 'i7 11th Gen', 
      ram: '32GB', 
      storage: '512GB SSD', 
      display: '15.6" FHD 4GB GFX' 
    }, 
    imageId: 'laptop-hp-zbook-firefly-15-g8-1' 
  },
  { 
    id: 'lpt-hp-zhan-66-1', 
    name: 'Hp Zhan 66 Pro 14 G4', 
    brand: 'HP', 
    price: 51750, // 45000 * 1.15
    status: 'Boxed',
    description: 'New boxed condition professional laptop for serious work.',
    specifications: { 
      processor: 'i7 11th Gen', 
      ram: '8GB', 
      storage: '256GB SSD', 
      display: '14" FHD' 
    }, 
    imageId: 'laptop-hp-zhan-66-pro-14-g4-1' 
  },
  { 
    id: 'lpt-hp-zbf-16-g9-1', 
    name: 'Hp Zbook Firefly 16 G9', 
    brand: 'HP', 
    price: 63250, // 55000 * 1.15
    status: 'Boxed',
    description: 'Modern 16-inch mobile workstation with massive 1TB storage.',
    specifications: { 
      processor: 'i7 12th Gen', 
      ram: '16GB', 
      storage: '1TB SSD', 
      display: '16" FHD' 
    }, 
    imageId: 'laptop-hp-zbook-firefly-16-g9-1' 
  },
  { 
    id: 'lpt-dell-lat-5400-512', 
    name: 'Dell Latitude 5400 Touch', 
    brand: 'Dell', 
    price: 28750, // 25000 * 1.15
    status: 'Boxed',
    description: 'Boxed condition durable 14-inch business laptop with touch screen.',
    specifications: { 
      processor: 'i5 8th Gen', 
      ram: '8GB', 
      storage: '512GB SSD', 
      display: '14" FHD Touch' 
    }, 
    imageId: 'laptop-dell-latitude-5400-1' 
  },
  { 
    id: 'lpt-dell-5400-touch-256', 
    name: 'Dell 5400 Touch', 
    brand: 'Dell', 
    price: 27600, // 24000 * 1.15
    status: 'Boxed',
    description: 'Reliable boxed 14-inch laptop with responsive touch display.',
    specifications: { 
      processor: 'i5 8th Gen', 
      ram: '8GB', 
      storage: '256GB SSD', 
      display: '14" FHD Touch' 
    }, 
    imageId: 'laptop-dell-5400-1' 
  },
  { 
    id: 'lpt-dell-5400-non-touch', 
    name: 'Dell 5400 Non-Touch', 
    brand: 'Dell', 
    price: 26450, // 23000 * 1.15
    status: 'Boxed',
    description: 'Sturdy business laptop in boxed condition for everyday office tasks.',
    specifications: { 
      processor: 'i5 8th Gen', 
      ram: '8GB', 
      storage: '256GB SSD', 
      display: '14" FHD' 
    }, 
    imageId: 'laptop-dell-5400-2' 
  },
  { 
    id: 'lpt-dell-7490-1', 
    name: 'Dell 7490', 
    brand: 'Dell', 
    price: 25875, // 22500 * 1.15
    status: 'Ex-UK',
    description: 'Slim and lightweight business classic with great port selection.',
    specifications: { 
      processor: 'i5 8th Gen', 
      ram: '8GB', 
      storage: '256GB SSD', 
      display: '14" FHD' 
    }, 
    imageId: 'laptop-dell-7490-1' 
  },
  { 
    id: 'lpt-lenovo-x13-1', 
    name: 'Lenovo x13 Touch', 
    brand: 'Lenovo', 
    price: 37375, // 32500 * 1.15
    status: 'Ex-UK',
    description: 'Powerful 13-inch ThinkPad with 10th Gen i7 and touch display.',
    specifications: { 
      processor: 'i7 10th Gen', 
      ram: '16GB', 
      storage: '256GB SSD', 
      display: '13.3" Touch' 
    }, 
    imageId: 'laptop-lenovo-x13-1' 
  },
  { 
    id: 'lpt-macbook-pro-16-2019', 
    name: 'Macbook pro 2019 16"', 
    brand: 'Apple', 
    price: 69000, // 60000 * 1.15
    status: 'Ex-UK',
    description: 'Classic 16-inch powerhouse with Radeon graphics and Retina display.',
    specifications: { 
      processor: 'Intel i7', 
      ram: '16GB', 
      storage: '512GB SSD', 
      display: '16" Retina 4GB GFX' 
    }, 
    imageId: 'laptop-macbook-pro-2019-1' 
  },
];

export const accessories: Accessory[] = [
  { 
    id: 'acc-dell-mouse-wireless', 
    name: 'Original Dell Mouse wireless', 
    brand: 'Dell', 
    price: 1955, // 1700 * 1.15
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
  },
  { 
    id: 'acc-ups-apc-700', 
    name: 'APC 700VA UPS', 
    brand: 'APC', 
    price: 11500, 
    category: 'UPS', 
    status: 'New',
    description: 'Solid backup power for mid-range desktops and peripherals.',
    imageId: 'ups-placeholder' 
  },
  { 
    id: 'acc-prn-can-mg2541s', 
    name: 'Canon MG2541S Printer', 
    brand: 'Canon', 
    price: 6500, 
    category: 'Printers', 
    status: 'New',
    description: 'Compact and affordable all-in-one printer, scanner, and copier.',
    imageId: 'printer-placeholder' 
  },
  { 
    id: 'acc-sw-kas-std-1', 
    name: 'Kaspersky Standard 1 user', 
    brand: 'Kaspersky', 
    price: 2200, 
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
