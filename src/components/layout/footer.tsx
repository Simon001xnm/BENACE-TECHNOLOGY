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
    <footer className="bg-white border-t-8 border-black">
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
            <p className="text-sm font-bold leading-relaxed text-zinc-500 max-w-xs italic border-l-4 border-primary pl-4">
              Helping people in Nairobi with high-quality laptops and professional website design since 2018.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Globe].map((Icon, i) => (
                <Link key={i} href="#" className="h-10 w-10 flex items-center justify-center border-2 border-black bg-white shadow-neo hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all">
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8 border-b-2 border-zinc-100 pb-2">What We Do</h4>
            <ul className="space-y-4">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs font-black uppercase tracking-widest text-black hover:text-primary hover:translate-x-2 inline-block transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8 border-b-2 border-zinc-100 pb-2">Learn More</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs font-black uppercase tracking-widest text-black hover:text-primary hover:translate-x-2 inline-block transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8 border-b-2 border-zinc-100 pb-2">Visit Our Shop</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 flex items-center justify-center border-2 border-black bg-zinc-50 shadow-neo">
                   <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="text-xs font-black uppercase tracking-widest leading-tight">
                  <p className="text-black">Old Nation House</p>
                  <p className="text-zinc-400 mt-1">2nd Floor, Shop D1</p>
                  <p className="text-zinc-400">Nairobi, Kenya</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="h-10 w-10 shrink-0 flex items-center justify-center border-2 border-black bg-zinc-50 shadow-neo">
                   <Phone className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest">0714210957</span>
              </div>
            </div>
            
            <Link href="/contact" className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-primary group border-2 border-black p-4 bg-white shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
              Talk to Us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t-4 border-black flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black text-center md:text-left">
            &copy; {currentYear} BENACE TECH HUB. ALL RIGHTS RESERVED. <span className="mx-2 hidden md:inline">|</span> MADE IN NAIROBI.
          </p>
          <div className="flex items-center gap-8">
             <div className="flex flex-col items-end text-right">
                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 mb-1">Created and Maintained by</span>
                <Link 
                  href="https://simonstyles.co.ke" 
                  target="_blank"
                  className="text-[10px] font-black text-primary hover:underline uppercase tracking-[0.2em] border-2 border-black px-4 py-2 bg-white shadow-neo"
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
