import type { Laptop, Service, PortfolioProject, Accessory } from '@/lib/types';
import { Code, Wrench, Zap } from 'lucide-react';

/**
 * Static product arrays containing real verified store items.
 * All brand mentions updated specifically to Benace Technologies Limited.
 */
export const laptops: Laptop[] = [
  {
    id: 'lenovo-tb-14-g6-premium',
    name: 'Lenovo ThinkBook 14 G6 13th Gen Core i7',
    brand: 'Lenovo',
    price: 70000,
    oldPrice: 85000,
    salePercentage: 18,
    status: 'New',
    description: `The Lenovo ThinkBook 14 G6 is a robust and versatile laptop, powered by the latest 13th Gen Intel Core i7 processor. This laptop offers excellent performance for professionals and power users, with a perfect balance of power, portability, and functionality. Whether you’re working on demanding projects or multitasking, the ThinkBook 14 G6 delivers everything you need, with 32GB DDR5 RAM, a 512GB M.2 PCIe 4.0 SSD, and a 14" 1920 x 1200 IPS touchscreen display for a premium experience.

Key Features:
- 13th Gen Intel Core i7 Processor (10 cores, 1.7GHz): Exceptional performance for video editing, data analysis, and heavy multitasking.
- 32GB DDR5 RAM: Smooth multitasking and fast application load times.
- 512GB PCIe 4.0 SSD: Lightning-fast data transfer and boot times.
- 14" 1920 x 1200 IPS Touchscreen: Sharp, vibrant display with wide viewing angles.
- Intel Iris Xe Graphics: Smooth visuals for everyday tasks and media editing.
- 1080p Webcam with Privacy Shutter: Clear video for meetings with enhanced security.
- Windows 11 Pro: Latest intuitive interface and performance.
- 1 Year Dealership Warranty.

Available at Benace Technologies Limited
Looking to purchase a laptop with premium specs? Visit Benace Technologies Limited for the Lenovo ThinkBook 14 G6, offering 13th Gen Intel Core i7, 32GB RAM, and 512GB SSD at great prices. We provide fast delivery across Nairobi and Kenya, along with a 1-year dealership warranty.

Why Buy from Benace Technologies Limited?
- Affordable Prices: Get the best deals on laptops in Nairobi, Kenya.
- Quality Products: Purchase from a trusted dealer offering only genuine, brand-new laptops.
- Fast Delivery: Fast shipping to locations across Kenya, including Nairobi.
- Excellent Customer Support: We're here to help you every step of the way.`,
    specifications: {
      processor: '13th Gen 1.7GHz Intel Core i7 10-Core',
      ram: '32GB DDR5 RAM',
      storage: '512GB M.2 PCIe 4.0 SSD',
      display: '14" 1920x1200 IPS Touchscreen',
      graphics: 'Intel Iris Xe Graphics',
      battery: 'Integrated 1080p Webcam',
      weight: '1.4 kg Sleek Aluminum',
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