import type { Laptop, Service, PortfolioProject, Accessory } from '@/lib/types';
import { Code, Wrench, Zap } from 'lucide-react';

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
  },
  {
    id: 'hp-elitebook-820-g3-premium',
    name: 'HP EliteBook 820 G3 6th Gen Core i7',
    brand: 'HP',
    price: 27000,
    oldPrice: 35000,
    salePercentage: 22,
    status: 'Ex-UK',
    description: `Impressively thin and light: The HP EliteBook 820 empowers users to create, connect, and collaborate, using enterprise-class performance technology that helps keep you productive in and out of the office.

Portable powerhouse: Combine high performance technology and long battery life with Windows 10 Pro, 6th Gen Intel Core processors, and a PCIe Gen3 SSD. Unlock next generation memory performance with DDR4 memory for your most demanding business applications.

Slim new design with all the right ports: Connect to essential ports you need without the hassle of dongles. At just 18.9 mm, the ultraslim and light HP EliteBook 820 comes with VGA, Display Port, RJ-45, USB, USB-C, and enterprise docking capabilities.

Strong security, powerful manageability: Protect, detect, and recover from malicious attacks with HP Sure Start with Dynamic Protection mechanisms.

Available at Benace Technologies Limited
Looking to purchase a reliable, enterprise-ready laptop at an affordable rate? Visit Benace Technologies Limited for the HP EliteBook 820 G3, offering 6th Gen Intel Core i7, 8GB RAM, and a fast 256GB SSD. We provide prompt delivery across Nairobi and Kenya, complete with a 6-month warranty framework.`,
    specifications: {
      processor: 'Intel Core i7-6200U 6th Gen',
      ram: '8GB DDR4 RAM',
      storage: '256GB High-Speed SSD',
      display: '12.5" FHD Display Slim',
      graphics: 'Intel HD Graphics 520',
      battery: 'Bluetooth, Webcam & WiFi Integrated',
      weight: '1.26 kg Ultralight Design',
      os: 'FreeDOS'
    },
    imageId: 'hp-elitebook-820-g3-img',
    type: 'laptop'
  },
  {
    id: 'hp-spectre-13-x360-premium',
    name: 'HP Spectre 13 x360 11th Gen Core i7 Convertible',
    brand: 'HP',
    price: 185000,
    oldPrice: 220000,
    salePercentage: 15,
    status: 'New',
    description: `Masterful craftsmanship meets breathtaking performance. The HP Spectre 13 x360 convertible laptop dynamically adapts to your lifestyle, delivering top-tier performance with an 11th Generation Intel Core i7 processor and an elegant, ultra-premium aluminum gem-cut chassis.

Equipped with 16GB of onboard memory and a blazing-fast 512GB SSD augmented with 32GB Intel Optane™ Memory for extreme storage acceleration. The vibrant 13.3-inch IPS touchscreen display delivers rich colors, wide viewing angles, and a highly responsive workflow interface.

Enjoy seamless connectivity, an integrated high-definition webcam, and smooth graphics computation powered by Intel Iris Xe Graphics. Perfect for high-level business executives, digital content creators, and remote professionals.

Available at Benace Technologies Limited
Looking to elevate your professional setup with an elite luxury laptop? Visit Benace Technologies Limited for the HP Spectre 13 x360. We provide fast delivery across Nairobi and Kenya, backed by a comprehensive dealership warranty framework.`,
    specifications: {
      processor: '11th Gen Intel Core i7 Processor',
      ram: '16GB High-Speed RAM',
      storage: '512GB SSD + 32GB Intel Optane Acceleration',
      display: '13.3" IPS Touchscreen Display',
      graphics: 'Intel Iris Xᵉ Graphics',
      battery: 'High-Capacity Long Battery Life',
      weight: '1.27 kg Gem-Cut Chassis',
      os: 'Windows 10 / 11 Pro'
    },
    imageId: 'hp-spectre-13-x360-img',
    type: 'laptop'
  },
  {
    id: 'dell-latitude-7420-i5',
    name: 'Dell Latitude 7420 Core i5',
    brand: 'Dell',
    price: 30000,
    oldPrice: 32000,
    salePercentage: 6,
    status: 'Ex-UK',
    description: `Elevate your business productivity with the Dell Latitude 7420. Powered by a 10th Gen Intel Core i5 processor and 16GB of LPDDR4x RAM, this 14-inch business laptop is designed for professionals who need power, security, and portability. With a lightweight design starting at 1.22kg and Thunderbolt 4 connectivity, it is perfect for the modern workspace.

Key Features:
- 10th Gen Intel Core i5 processor: Reliable performance for daily office tasks and multitasking.
- 16GB LPDDR4x RAM: Smooth operation even with multiple browser tabs and office applications.
- 256GB PCIe NVMe SSD: Fast boot times and data access.
- 14.0″ FHD IPS Anti-glare Display: Clear visuals for comfortable work throughout the day.
- Intel Iris Xe Integrated Graphics: Handles all business visual needs efficiently.
- Wi-Fi 6 + Bluetooth 5.x: Cutting-edge connectivity for fast wireless speeds.
- Lightweight Chassis: Easy to carry between meetings or during travel.

Available at Benace Technologies Limited
Looking for a high-performance business laptop at an unbeatable price? Visit Benace Technologies Limited for the Dell Latitude 7420. We offer fast delivery across Nairobi and Kenya, backed by our professional technical support.`,
    specifications: {
      processor: '10th Gen Intel Core i5',
      ram: '16GB LPDDR4x RAM',
      storage: '256GB PCIe NVMe SSD',
      display: '14.0" FHD (1920x1080) IPS',
      graphics: 'Intel Iris Xe Graphics',
      battery: '4-cell High Capacity Battery',
      weight: '1.22 kg Business Chassis',
      os: 'Windows 10 / 11 Pro'
    },
    imageId: 'dell-latitude-7420-img',
    type: 'laptop'
  },
  {
    id: 'dell-latitude-5400-i5',
    name: 'Dell Latitude 5400 Business Laptop 14.0" Display',
    brand: 'Dell',
    price: 27500,
    oldPrice: 31000,
    salePercentage: 11,
    status: 'Ex-UK',
    description: `The Dell Latitude 5400 is an enterprise-grade 14-inch laptop designed for optimal business environments, performance, and long-lasting productivity. Powered by an efficient 8th Generation Intel Core i5 quad-core processor, it delivers fast computing capabilities while staying incredibly portable.

General Specifications:
- 1.6 GHz upto 4.1GHz Intel Core i5-8365U / 8265U Quad-Core
- 8GB of DDR4 RAM for responsive computing
- 256GB High-Speed PCIe M.2 SSD for rapid data storage
- 14.0" 1920 x 1080 Full HD Anti-glare Display
- Intel UHD 620 Graphics
- Wi-Fi 5 (802.11ac), Bluetooth 5.0, Gigabit Ethernet Port
- Secure and reliable enterprise design layout
- Ex-UK with a 6 Months Warranty framework

Available at Benace Technologies Limited
Looking to get enterprise-ready laptops at highly competitive price tags? Visit Benace Technologies Limited for the Dell Latitude 5400, offering dependable 8th Gen processing, 8GB RAM, and a fast 256GB SSD. We provide quick shipping across Nairobi and all corners of Kenya.`,
    specifications: {
      processor: 'Intel Core i5-8365U Quad-Core Upto 4.1GHz',
      ram: '8GB DDR4 RAM',
      storage: '256GB PCIe M.2 SSD',
      display: '14.0" FHD (1920x1080) Anti-glare',
      graphics: 'Intel UHD 620 Graphics',
      battery: 'High-capacity ExpressCharge battery',
      weight: '1.48 kg Durable Chassis',
      os: 'Windows 10 / 11 Pro'
    },
    imageId: 'dell-latitude-5400-img',
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