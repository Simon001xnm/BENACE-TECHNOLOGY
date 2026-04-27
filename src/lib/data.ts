import type { Laptop, Service, PortfolioProject, Accessory } from '@/lib/types';
import { Code, Brush, ShoppingCart } from 'lucide-react';

export const laptops: Laptop[] = [
  // HP
  { id: 'lpt-hp-001', name: 'Probook 11 G6', brand: 'HP', price: 17500, specifications: { processor: 'Core i5', ram: '8GB', storage: '128GB SSD', display: '11.6"' }, imageId: 'laptop-hp-probook-11-g6' },
  { id: 'lpt-hp-002', name: 'Dragonfly x360', brand: 'HP', price: 47500, specifications: { processor: 'Core i5 8th Gen', ram: '8GB', storage: '256GB SSD', display: '13.3" x360 Touch' }, imageId: 'laptop-hp-dragonfly' },
  { id: 'lpt-hp-003', name: 'EliteBook 830 G7', brand: 'HP', price: 50000, specifications: { processor: 'Core i7 10th Gen', ram: '16GB', storage: '256GB SSD', display: '13.3" Touch' }, imageId: 'laptop-hp-830-g7' },
  { id: 'lpt-hp-004', name: 'EliteBook 830 G8 x360', brand: 'HP', price: 72500, specifications: { processor: 'Core i7 11th Gen', ram: '16GB', storage: '512GB SSD', display: '13.3" x360 Touch' }, imageId: 'laptop-hp-830-g8-x360' },
  { id: 'lpt-hp-005', name: 'EliteBook 830 G8', brand: 'HP', price: 60000, specifications: { processor: 'Core i7 11th Gen', ram: '16GB', storage: '512GB SSD', display: '13.3" Touch' }, imageId: 'laptop-hp-830-g8' },
  { id: 'lpt-hp-006', name: 'EliteBook 840 G5', brand: 'HP', price: 30000, specifications: { processor: 'Core i5 7th Gen', ram: '8GB', storage: '256GB SSD', display: '14"' }, imageId: 'laptop-hp-840-g5' },
  { id: 'lpt-hp-007', name: 'EliteBook 840 G7', brand: 'HP', price: 37500, specifications: { processor: 'Core i5 10th Gen', ram: '16GB', storage: '256GB SSD', display: '14"' }, imageId: 'laptop-hp-840-g7' },
  { id: 'lpt-hp-008', name: 'EliteBook 840 G8', brand: 'HP', price: 40625, specifications: { processor: 'Core i5 10th Gen', ram: '8GB', storage: '256GB SSD', display: '14"' }, imageId: 'laptop-hp-840-g8-i5-10th' },
  { id: 'lpt-hp-009', name: 'EliteBook 840 G8', brand: 'HP', price: 42500, specifications: { processor: 'Core i5 11th Gen', ram: '16GB', storage: '256GB SSD', display: '14"' }, imageId: 'laptop-hp-840-g8-i5-11th' },
  { id: 'lpt-hp-010', name: 'EliteBook 1030 G7 x360', brand: 'HP', price: 68750, specifications: { processor: 'Core i7 10th Gen', ram: '16GB', storage: '512GB SSD', display: '13.3" x360' }, imageId: 'laptop-hp-1030-g7-16gb' },
  { id: 'lpt-hp-011', name: 'EliteBook 1030 G7 x360', brand: 'HP', price: 72500, specifications: { processor: 'Core i7 10th Gen', ram: '32GB', storage: '512GB SSD', display: '13.3" x360' }, imageId: 'laptop-hp-1030-g7-32gb' },
  { id: 'lpt-hp-012', name: 'EliteBook 1030 G8 x360', brand: 'HP', price: 65000, specifications: { processor: 'Core i7 11th Gen', ram: '16GB', storage: '256GB SSD', display: '13.3" x360' }, imageId: 'laptop-hp-1030-g8' },
  { id: 'lpt-hp-013', name: 'EliteBook 1040 G8 x360', brand: 'HP', price: 72500, specifications: { processor: 'Core i7 11th Gen', ram: '16GB', storage: '512GB SSD', display: '14" x360' }, imageId: 'laptop-hp-1040-g8' },
  { id: 'lpt-hp-014', name: 'Zbook Firefly 15 G8', brand: 'HP', price: 93750, specifications: { processor: 'Core i7 11th Gen', ram: '32GB', storage: '512GB SSD', display: '15.6", 4GB Graphics' }, imageId: 'laptop-hp-zbook-15-g8' },
  { id: 'lpt-hp-015', name: 'Zhan 66 Pro 14 G4', brand: 'HP', price: 56250, specifications: { processor: 'Core i7 11th Gen', ram: '8GB', storage: '256GB SSD', display: '14"' }, imageId: 'laptop-hp-zhan-66-g4' },
  { id: 'lpt-hp-016', name: 'Zbook Firefly 16 G9', brand: 'HP', price: 68750, specifications: { processor: 'Core i7 12th Gen', ram: '16GB', storage: '1TB SSD', display: '16"' }, imageId: 'laptop-hp-zbook-16-g9' },
  // DELL
  { id: 'lpt-dell-001', name: 'PRO 14 ULTRA 7', brand: 'Dell', price: 156250, specifications: { processor: 'Ultra 7 256U', ram: '8GB', storage: '512GB SSD', display: '14" Ubuntu' }, imageId: 'laptop-dell-pro-14' },
  { id: 'lpt-dell-002', name: 'Latitude 5400', brand: 'Dell', price: 31250, specifications: { processor: 'Core i5 8th Gen', ram: '8GB', storage: '512GB SSD', display: '14" Touch' }, imageId: 'laptop-dell-5400-512gb' },
  { id: 'lpt-dell-003', name: 'Latitude 5400', brand: 'Dell', price: 30000, specifications: { processor: 'Core i5 8th Gen', ram: '8GB', storage: '256GB SSD', display: '14" Touch' }, imageId: 'laptop-dell-5400-256gb-touch' },
  { id: 'lpt-dell-004', name: 'Latitude 5400', brand: 'Dell', price: 28750, specifications: { processor: 'Core i5 8th Gen', ram: '8GB', storage: '256GB SSD', display: '14"' }, imageId: 'laptop-dell-5400-256gb-nontouch' },
  { id: 'lpt-dell-005', name: 'Latitude 7320 x360', brand: 'Dell', price: 43750, specifications: { processor: 'Core i7 11th Gen', ram: '16GB', storage: '512GB SSD', display: '13" x360 Touch' }, imageId: 'laptop-dell-7320' },
  { id: 'lpt-dell-006', name: 'Latitude 7490', brand: 'Dell', price: 30000, specifications: { processor: 'Core i5 8th Gen', ram: '8GB', storage: '256GB SSD', display: '14"' }, imageId: 'laptop-dell-7490' },
  // LENOVO
  { id: 'lpt-lenovo-001', name: 'ThinkBook 14 G8', brand: 'Lenovo', price: 137500, specifications: { processor: 'Ultra 7 255H', ram: '16GB', storage: '512GB SSD', display: '14" Arctic Grey' }, imageId: 'laptop-lenovo-thinkbook-14-g8' },
  { id: 'lpt-lenovo-002', name: 'ThinkPad X13', brand: 'Lenovo', price: 40625, specifications: { processor: 'Core i7 10th Gen', ram: '16GB', storage: '256GB SSD', display: '13.3" Touch' }, imageId: 'laptop-lenovo-x13' },
  // APPLE
  { id: 'lpt-apple-001', name: 'MacBook Pro 16" 2019', brand: 'Apple', price: 75000, specifications: { processor: 'Core i7', ram: '16GB', storage: '512GB SSD', display: '16", 4GB Radeon' }, imageId: 'laptop-apple-mbp-16-2019' },
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
  { id: 'acc-dell-001', name: 'Wireless Mouse', brand: 'Dell', price: 2125, category: 'Mouse', imageId: 'accessory-dell-mouse' },
];
