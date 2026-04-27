import type { Laptop, Service, PortfolioProject, Accessory } from '@/lib/types';
import { Code, Brush, ShoppingCart } from 'lucide-react';

export const laptops: Laptop[] = [
  { id: 'lpt-dell-pro-14-1', name: 'Dell Pro 14 PC14250', brand: 'Dell', price: 125000, oldPrice: 148000, salePercentage: 16, specifications: { processor: 'Intel Core Ultra 7 265U', ram: '8GB', storage: '512GB SSD', display: '14" Ubuntu' }, imageId: 'laptop-dell-pro-14-1', status: 'New' },
  { id: 'lpt-lenovo-thinkbook-14-g8-1', name: 'Lenovo ThinkBook 14 G8', brand: 'Lenovo', price: 110000, specifications: { processor: 'Ultra 7 255H', ram: '16GB', storage: '512SSD', display: '14"' }, imageId: 'laptop-lenovo-thinkbook-14-g8-1', status: 'New' },
  { id: 'lpt-hp-probook-11-g6-1', name: 'Hp Probook 11 g6', brand: 'HP', price: 14000, specifications: { processor: 'Core i5', ram: '8gb', storage: '128ssd', display: '' }, imageId: 'laptop-hp-probook-11-g6-1', status: 'Ex-UK' },
  { id: 'lpt-hp-dragonfly-1', name: 'Hp Dragonfly', brand: 'HP', price: 38000, specifications: { processor: 'Core i5 8th gen', ram: '8gb', storage: '256ssd', display: 'x360' }, imageId: 'laptop-hp-dragonfly-1', status: 'Ex-UK' },
  { id: 'lpt-hp-830-g7-1', name: 'Hp 830 G7', brand: 'HP', price: 40000, specifications: { processor: 'i7 10th gen', ram: '16gb', storage: '256ssd', display: 'Touch' }, imageId: 'laptop-hp-830-g7-1', status: 'Ex-UK' },
  { id: 'lpt-hp-830-g8-1', name: 'Hp 830 G8', brand: 'HP', price: 58000, specifications: { processor: 'i7 11th gen', ram: '16gb', storage: '512ssd', display: 'x360 Touch' }, imageId: 'laptop-hp-830-g8-1', status: 'Ex-UK' },
  { id: 'lpt-hp-830-g8-2', name: 'Hp 830 G8', brand: 'HP', price: 48000, specifications: { processor: 'i7 11th gen', ram: '16gb', storage: '512ssd', display: 'Touch' }, imageId: 'laptop-hp-830-g8-2', status: 'Ex-UK' },
  { id: 'lpt-hp-840-g5-1', name: 'Hp 840 G5', brand: 'HP', price: 24000, specifications: { processor: 'i5 7th gen', ram: '8gb', storage: '256ssd', display: '' }, imageId: 'laptop-hp-840-g5-1', status: 'Ex-UK' },
  { id: 'lpt-hp-840-g7-1', name: 'Hp 840 G7', brand: 'HP', price: 30000, specifications: { processor: 'i5 10th gen', ram: '16gb', storage: '256ssd', display: '' }, imageId: 'laptop-hp-840-g7-1', status: 'Ex-UK' },
  { id: 'lpt-hp-840-g8-1', name: 'Hp 840 G8', brand: 'HP', price: 32500, specifications: { processor: 'i5 10th gen', ram: '8gb', storage: '256ssd', display: '' }, imageId: 'laptop-hp-840-g8-1', status: 'Ex-UK' },
  { id: 'lpt-hp-840-g8-2', name: 'Hp 840 G8', brand: 'HP', price: 34000, specifications: { processor: 'i5 11th gen', ram: '16gb', storage: '256ssd', display: '' }, imageId: 'laptop-hp-840-g8-2', status: 'Ex-UK' },
  { id: 'lpt-hp-1030-g7-1', name: 'Hp 1030 G7', brand: 'HP', price: 55000, specifications: { processor: 'i7 10th gen', ram: '16gb', storage: '512ssd', display: 'x360' }, imageId: 'laptop-hp-1030-g7-1', status: 'New' },
  { id: 'lpt-hp-1030-g7-2', name: 'Hp 1030 G7', brand: 'HP', price: 58000, specifications: { processor: 'i7 10th gen', ram: '32gb', storage: '512ssd', display: 'x360' }, imageId: 'laptop-hp-1030-g7-2', status: 'New' },
  { id: 'lpt-hp-1030-g8-1', name: 'Hp 1030 G8', brand: 'HP', price: 52000, specifications: { processor: 'i7 11th gen', ram: '16gb', storage: '256ssd', display: 'x360' }, imageId: 'laptop-hp-1030-g8-1', status: 'New' },
  { id: 'lpt-hp-1040-g8-1', name: 'Hp 1040 G8', brand: 'HP', price: 58000, specifications: { processor: 'i7 11th gen', ram: '16gb', storage: '512ssd', display: 'x360' }, imageId: 'laptop-hp-1040-g8-1', status: 'New' },
  { id: 'lpt-hp-zbook-firefly-15-g8-1', name: 'Hp Zbook Firefly 15 G8', brand: 'HP', price: 75000, specifications: { processor: 'i7 11th gen', ram: '32gb', storage: '512ssd', display: '4gb Graphics' }, imageId: 'laptop-hp-zbook-firefly-15-g8-1', status: 'New' },
  { id: 'lpt-hp-zhan-66-pro-14-g4-1', name: 'Hp Zhan 66 Pro 14 G4', brand: 'HP', price: 45000, specifications: { processor: 'Core i7 11th gen', ram: '8gb', storage: '256ssd', display: '' }, imageId: 'laptop-hp-zhan-66-pro-14-g4-1', status: 'Boxed' },
  { id: 'lpt-hp-zbook-firefly-16-g9-1', name: 'Hp Zbook Firefly 16 G9', brand: 'HP', price: 55000, specifications: { processor: 'Core i7 12th gen', ram: '16gb', storage: '1Tb', display: 'no graphics' }, imageId: 'laptop-hp-zbook-firefly-16-g9-1', status: 'Boxed' },
  { id: 'lpt-dell-latitude-5400-1', name: 'Dell latitude 5400', brand: 'Dell', price: 25000, specifications: { processor: 'core i5 8th gen', ram: '8gb', storage: '512ssd', display: 'Touch' }, imageId: 'laptop-dell-latitude-5400-1', status: 'Boxed' },
  { id: 'lpt-dell-5400-1', name: 'Dell 5400', brand: 'Dell', price: 24000, specifications: { processor: 'core i5 8th gen', ram: '8gb', storage: '256ssd', display: 'touch' }, imageId: 'laptop-dell-5400-1', status: 'Boxed' },
  { id: 'lpt-dell-5400-2', name: 'Dell 5400', brand: 'Dell', price: 23000, specifications: { processor: 'core i5 8th gen', ram: '8gb', storage: '256ssd', display: 'non touch' }, imageId: 'laptop-dell-5400-2', status: 'Boxed' },
  { id: 'lpt-dell-7320-1', name: 'Dell 7320', brand: 'Dell', price: 35000, specifications: { processor: 'core i7 11th gen', ram: '16gb', storage: '512ssd', display: 'x360 touch 13" silver' }, imageId: 'laptop-dell-7320-1', status: 'Boxed' },
  { id: 'lpt-dell-7490-1', name: 'Dell 7490', brand: 'Dell', price: 24000, specifications: { processor: 'core i5 8th gen', ram: '8gb', storage: '256ssd', display: '' }, imageId: 'laptop-dell-7490-1', status: 'Ex-UK' },
  { id: 'lpt-lenovo-x13-1', name: 'Lenovo x13', brand: 'Lenovo', price: 32500, specifications: { processor: 'core i7 10th gen', ram: '16gb', storage: '256ssd', display: 'Touch (Normal)' }, imageId: 'laptop-lenovo-x13-1', status: 'Ex-UK' },
  { id: 'lpt-macbook-pro-2019-1', name: 'Macbook pro 2019', brand: 'Apple', price: 60000, specifications: { processor: 'i7', ram: '16gb', storage: '512ssd', display: '16" 4gb Radeon' }, imageId: 'laptop-macbook-pro-2019-1', status: 'Ex-UK' },
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
  { id: 'acc-dell-mouse-1', name: 'Original Dell Mouse wireless', brand: 'Dell', price: 1700, category: 'Mouse', imageId: 'accessory-dell-mouse-1', status: 'New' },
];
