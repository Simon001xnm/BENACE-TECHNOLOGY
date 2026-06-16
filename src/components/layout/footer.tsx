import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Globe, ArrowRight } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    solutions: [
      { name: 'Laptops for Sale', href: '/laptops' },
      { name: 'Computer Parts', href: '/accessories' },
      { name: 'Repair Services', href: '/repairs' },
      { name: 'Laptop Hire', href: '/laptop-hire' },
      { name: 'Website Design', href: '/services' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Work', href: '/services#portfolio' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
    support: [
      { name: 'Technical Help', href: '/contact' },
      { name: 'Bulk Orders', href: '/laptop-hire' },
      { name: 'WhatsApp Sales', href: 'https://wa.me/254714210957' },
      { name: 'Visit Our Shop', href: '/contact' },
    ]
  };

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto max-w-7xl px-4 pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link href="/" className="inline-block group">
              <Image
                src="/use.png"
                alt="Benace Technologies"
                width={150}
                height={40}
                className="object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-sm font-medium leading-relaxed text-zinc-500 max-w-xs italic border-l-2 border-primary pl-4">
              Helping people in Nairobi with high-quality laptops and professional website design since 2018.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Globe].map((Icon, i) => (
                <Link key={i} href="#" className="h-10 w-10 flex items-center justify-center rounded-full border border-zinc-200 bg-white hover:border-primary hover:text-primary transition-all">
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-8 border-b pb-2">What We Do</h4>
            <ul className="space-y-4">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-8 border-b pb-2">Learn More</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-8 border-b pb-2">Visit Our Shop</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-zinc-50 border border-zinc-200">
                   <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest leading-tight">
                  <p className="text-black">Old Nation House</p>
                  <p className="text-zinc-400 mt-1">2nd Floor, Shop D1</p>
                  <p className="text-zinc-400">Nairobi, Kenya</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-zinc-50 border border-zinc-200">
                   <Phone className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">0714210957</span>
              </div>
            </div>
            
            <Link href="/contact" className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white px-8 py-4 bg-black rounded-full hover:bg-primary transition-all group">
              Talk to Us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 text-center md:text-left">
            &copy; {currentYear} Benace Tech Hub. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
             <div className="flex flex-col items-end text-right">
                <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Created and Maintained by</span>
                <Link 
                  href="https://simonstyles.co.ke" 
                  target="_blank"
                  className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest"
                >
                  Simon Styles Technologies Limited
                </Link>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
