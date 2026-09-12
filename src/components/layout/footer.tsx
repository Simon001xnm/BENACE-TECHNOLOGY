'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Globe, ArrowUp, Coffee } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Our Hub',
      links: [
        { name: 'Laptops', href: '/laptops' },
        { name: 'Accessories', href: '/accessories' },
        { name: 'Laptop Hire', href: '/laptop-hire' },
        { name: 'About Us', href: '/about' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Computer Repair', href: '/repairs' },
        { name: 'Web Design', href: '/services' },
        { name: 'POS Setup', href: '/services' },
        { name: 'Tech Consulting', href: '/contact' },
      ],
    },
    {
      title: 'Let Us Help You',
      links: [
        { name: 'Returns Center', href: '/contact' },
        { name: 'Purchase Protection', href: '/about' },
        { name: 'Help & Support', href: '/contact' },
      ],
    },
    {
      title: 'Get to Know Us',
      links: [
        { name: 'Sustainability', href: '/about' },
        { name: 'Our Location', href: '/contact' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'East Africa Reach', href: '/about' },
      ],
    },
  ];

  return (
    <footer className="bg-[#131921] text-white">
      {/* Back to top */}
      <button 
        onClick={() => typeof window !== 'undefined' && window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full bg-[#37475a] py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#485769] transition-colors flex items-center justify-center gap-2"
      >
        <ArrowUp className="h-3 w-3" /> Back to top
      </button>

      {/* Main Footer Links */}
      <div className="container mx-auto max-w-7xl px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4 className="text-[11px] font-black uppercase tracking-widest mb-6 text-primary-foreground">{section.title}</h4>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[10px] font-bold text-zinc-400 hover:text-white uppercase tracking-wider transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Footer Details */}
      <div className="border-t border-zinc-800 py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="shrink-0">
              <Image
                src="/logo.jpeg"
                alt="Benace Technologies"
                width={80}
                height={30}
                className="rounded-sm"
              />
            </Link>
            <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-zinc-500">
               <div className="flex items-center border border-zinc-700 rounded px-2 py-1">
                 <Globe className="h-3 w-3 mr-2" /> English
               </div>
               <div className="flex items-center border border-zinc-700 rounded px-2 py-1">
                 Kenya & East Africa
               </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link href="#" className="h-8 w-8 flex items-center justify-center rounded-full border border-zinc-700 hover:border-primary hover:text-primary transition-all">
              <Facebook className="h-4 w-4" />
            </Link>
            <Link href="#" className="h-8 w-8 flex items-center justify-center rounded-full border border-zinc-700 hover:border-primary hover:text-primary transition-all">
              <Instagram className="h-4 w-4" />
            </Link>
            <Link href="#" className="h-8 w-8 flex items-center justify-center rounded-full border border-zinc-700 hover:border-primary hover:text-primary transition-all">
              <Twitter className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Payment Methods & Legal */}
      <div className="bg-[#0f1111] py-10 border-t border-zinc-900">
        <div className="container mx-auto px-4 text-center space-y-6">
          <div className="flex flex-wrap justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all">
            <span className="text-[8px] font-black uppercase tracking-widest">Visa</span>
            <span className="text-[8px] font-black uppercase tracking-widest">Mastercard</span>
            <span className="text-[8px] font-black uppercase tracking-widest">M-Pesa</span>
            <span className="text-[8px] font-black uppercase tracking-widest">PayPal</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-[8px] text-zinc-500 font-black uppercase tracking-[0.2em]">
            <Link href="#" className="hover:text-white transition-colors">Conditions of Use</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Notice</Link>
            <Link href="#" className="hover:text-white transition-colors">Interest-Based Ads</Link>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] flex items-center justify-center flex-wrap gap-1">
              &copy; {currentYear}. MADE IN KENYA BY <Coffee className="h-3 w-3 text-primary mx-0.5" /> 
              <Link 
                href="https://simonstyles.co.ke/agency" 
                target="_blank" 
                className="text-zinc-500 hover:text-primary transition-colors"
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
