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
    <footer className="bg-white border-t-2 border-zinc-100">
      <div className="container mx-auto max-w-7xl px-4 pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/use.png"
                alt="Benace Technologies"
                width={150}
                height={40}
                className="object-contain"
              />
            </Link>
            <p className="text-sm font-medium leading-relaxed text-zinc-500 max-w-xs italic">
              Helping people in Nairobi with high-quality laptops and professional website design since 2018.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Globe].map((Icon, i) => (
                <Link key={i} href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-zinc-50 text-zinc-400 hover:bg-primary hover:text-white transition-all">
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6">What We Do</h4>
            <ul className="space-y-4">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm font-bold text-zinc-600 hover:text-black hover:translate-x-1 inline-block transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6">Learn More</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm font-bold text-zinc-600 hover:text-black hover:translate-x-1 inline-block transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6">Visit Our Shop</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <div className="text-sm font-bold text-zinc-700">
                  <p>Old Nation House</p>
                  <p className="text-zinc-400 font-medium">2nd Floor, Shop D1</p>
                  <p className="text-zinc-400 font-medium">Nairobi, Kenya</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm font-bold text-zinc-700">0714210957</span>
              </div>
              <div className="flex gap-3 items-center">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm font-bold text-zinc-700">benacetechnologies@gmail.com</span>
              </div>
            </div>
            
            <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary group">
              Start a Conversation <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-zinc-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 text-center md:text-left">
            &copy; {currentYear} BENACE TECH HUB. ALL RIGHTS RESERVED. <span className="mx-2 hidden md:inline">|</span> MADE IN NAIROBI.
          </p>
          <div className="flex items-center gap-8">
             <div className="flex flex-col items-end text-right">
                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300">Made and Maintained by</span>
                <Link 
                  href="https://simonstyles.co.ke" 
                  target="_blank"
                  className="text-[9px] font-bold text-primary hover:underline uppercase tracking-widest"
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
