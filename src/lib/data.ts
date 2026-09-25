import type { Laptop, Service, PortfolioProject, Accessory } from '@/lib/types';
import { Code, Wrench, Zap } from 'lucide-react';

/**
 * Static product arrays are cleared to allow for a fresh start with real inventory.
 * Use the Admin Dashboard to add products matching your specific photos and prices.
 */
export const laptops: Laptop[] = [];

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
