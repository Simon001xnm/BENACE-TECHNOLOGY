'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Globe, ArrowUp, Coffee } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Our Technologies',
      links: [
        { name: 'Laptops', href: '/laptops' },
        { name: 'Accessories', href: '/accessories' },
        { name: 'Laptop Hire', href: '/laptop-hire' },
        { name: 'About Us', href: '/about' },
      ],
    },
    {
      title: 'Expert Services',
      links: [
        { name: 'Computer Repair', href: '/repairs' },
        { name: 'Web Design', href: '/services' },
        { name: 'POS Setup', href: '/services' },
        { name: 'Consulting', href: '/contact' },
      ],
    },
    {
      title: 'Support Hub',
      links: [
        { name: 'Returns', href: '/contact' },
        { name: 'Protection', href: '/about' },
        { name: 'Help Center', href: '/contact' },
      ],
    },
    {
      title: 'Reach Us',
      links: [
        { name: 'Location', href: '/contact' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'East Africa', href: '/about' },
      ],
    },
  ];

  return (
    <footer className="bg-[#003087] text-white">
      {/* Back to top */}
      <button 
        onClick={() => typeof window !== 'undefined' && window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full bg-[#0070ba] py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#005ea6] transition-colors flex items-center justify-center gap-2"
      >
        <ArrowUp className="h-3 w-3" /> Back to top
      </button>

      {/* Main Footer Links */}
      <div className="container mx-auto max-w-7xl px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4 className="text-[11px] font-black uppercase tracking-widest mb-6 text-white">{section.title}</h4>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[10px] font-bold text-white/60 hover:text-white uppercase tracking-wider transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Footer Details */}
      <div className="border-t border-white/10 py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="shrink-0">
              <Image
                src="/logo.jpeg"
                alt="Matesh Technologies"
                width={100}
                height={35}
                className="rounded-sm brightness-0 invert"
              />
            </Link>
            <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-white/50">
               <div className="flex items-center border border-white/20 rounded px-3 py-1.5">
                 <Globe className="h-3.5 w-3.5 mr-2" /> English
               </div>
               <div className="flex items-center border border-white/20 rounded px-3 py-1.5">
                 Kenya & East Africa
               </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link href="#" className="h-9 w-9 flex items-center justify-center rounded-full border border-white/20 hover:border-white hover:text-white transition-all">
              <Facebook className="h-4.5 w-4.5" />
            </Link>
            <Link href="#" className="h-9 w-9 flex items-center justify-center rounded-full border border-white/20 hover:border-white hover:text-white transition-all">
              <Instagram className="h-4.5 w-4.5" />
            </Link>
            <Link href="#" className="h-9 w-9 flex items-center justify-center rounded-full border border-white/20 hover:border-white hover:text-white transition-all">
              <Twitter className="h-4.5 w-4.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Legal & Attribution */}
      <div className="bg-[#002566] py-10 border-t border-white/5">
        <div className="container mx-auto px-4 text-center space-y-6">
          <div className="flex flex-wrap justify-center gap-6 text-[8px] text-white/40 font-black uppercase tracking-widest">
            <Link href="#" className="hover:text-white transition-colors">Conditions of Use</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Notice</Link>
            <Link href="#" className="hover:text-white transition-colors">Ad Choices</Link>
          </div>
          
          <div className="flex flex-col items-center gap-3">
            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest flex items-center justify-center flex-wrap gap-2">
              &copy; {currentYear}. MADE IN KENYA BY <Coffee className="h-4 w-4 text-white/60 mx-1" /> 
              <Link 
                href="https://simonstyles.co.ke/agency" 
                target="_blank" 
                className="text-white/60 hover:text-white transition-colors"
              >
                SIMON STYLES TECHNOLOGIES LIMITED
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
