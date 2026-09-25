import type { Laptop, Service, PortfolioProject, Accessory } from '@/lib/types';
import { Code, Wrench, Zap } from 'lucide-react';

/**
 * Static product arrays containing real verified store items.
 * All brand mentions updated specifically to Benace Technologies Limited.
 */
export const laptops: Laptop[] = [
  {
    id: 'lenovo-tb-14-g6',
    name: 'ThinkBook 14 G6 13th Gen Core i7 Touch',
    brand: 'Lenovo',
    price: 70000,
    oldPrice: 88000,
    salePercentage: 20,
    status: 'New',
    description: `The Lenovo ThinkBook 14 G6 is a robust and versatile laptop, powered by the latest 13th Gen Intel Core i7 processor. This laptop offers excellent performance for professionals and power users, with a perfect balance of power, portability, and functionality. Whether you’re working on demanding projects or multitasking, the ThinkBook 14 G6 delivers everything you need, with 32GB DDR5 RAM, a 512GB M.2 PCIe 4.0 SSD, and a 14" 1920 x 1200 IPS touchscreen display for a premium experience.

Key Features:
- 13th Gen Intel Core i7 Processor (10 cores, 1.7GHz)
- 32GB DDR5 RAM for lightning fast multitasking
- 512GB PCIe 4.0 high speed SSD storage
- 14" 1920 x 1200 IPS responsive Touchscreen
- Integrated Intel Iris Xe Graphics
- 1080p Webcam with Privacy Shutter & Dual Mics
- Genuine Windows 11 Pre-installed
- Professional and lightweight sleek aluminum body design
- 1 Year Warranty

Available at Benace Technologies Limited
Looking to purchase a laptop with premium specs? Visit Benace Technologies Limited for the Lenovo ThinkBook 14 G6, offering 13th Gen Intel Core i7, 32GB RAM, and 512GB SSD at great prices. We provide fast delivery across Nairobi and Kenya, along with a 1-year warranty.

Why Buy from Benace Technologies Limited?
- Affordable Prices: Get the best deals on premium laptops in Nairobi, Kenya.
- Quality Products: Purchase from a trusted dealer offering only genuine, brand-new gear.
- Fast Delivery: Secure shipping to locations across Kenya, including Nairobi.
- Excellent Customer Support: We are here to help you every single step of the way.`,
    specifications: {
      processor: '13th Gen Intel Core i7 (10-Core, 1.7GHz)',
      ram: '32GB DDR5 RAM',
      storage: '512GB M.2 PCIe 4.0 NVMe SSD',
      display: '14" WUXGA (1920x1200) IPS Touchscreen',
      graphics: 'Intel Iris Xe Graphics',
      battery: 'Integrated Smart Battery',
      weight: '1.4 kg Lightweight',
      os: 'Windows 11 Pro'
    },
    imageId: 'lenovo-thinkbook-14-g6-webp',
    type: 'laptop'
  }
];

export const accessories: Accessory[] = [];

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
