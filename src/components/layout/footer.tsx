import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Globe, ArrowUp } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'About Us',
      links: [
        { name: 'Careers', href: '#' },
        { name: 'Press Releases', href: '#' },
        { name: 'Amazon Science', href: '#' },
        { name: 'Our Hub', href: '/about' },
      ],
    },
    {
      title: 'Make Money with Us',
      links: [
        { name: 'Sell on Benace', href: '#' },
        { name: 'Sell Under Accelerator', href: '#' },
        { name: 'Become an Affiliate', href: '#' },
        { name: 'Advertise Your Products', href: '#' },
      ],
    },
    {
      title: 'Let Us Help You',
      links: [
        { name: 'Your Account', href: '/admin/login' },
        { name: 'Returns Center', href: '#' },
        { name: '100% Purchase Protection', href: '#' },
        { name: 'Help & Support', href: '/contact' },
      ],
    },
    {
      title: 'Get to Know Us',
      links: [
        { name: 'About Amazon', href: '#' },
        { name: 'Sustainability', href: '#' },
        { name: 'Investor Relations', href: '#' },
        { name: 'Tech Solutions', href: '/services' },
      ],
    },
  ];

  return (
    <footer className="bg-[#131921] text-white">
      {/* Back to top */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full bg-[#37475a] py-4 text-xs font-bold hover:bg-[#485769] transition-colors flex items-center justify-center gap-2"
      >
        <ArrowUp className="h-4 w-4" /> Back to top
      </button>

      {/* Main Footer Links */}
      <div className="container mx-auto max-w-7xl px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4 className="text-base font-bold mb-6">{section.title}</h4>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
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
                src="/use.png"
                alt="Benace Technologies"
                width={100}
                height={30}
                className="invert brightness-200"
              />
            </Link>
            <div className="flex items-center gap-4 text-xs font-medium text-zinc-400">
               <div className="flex items-center border border-zinc-700 rounded px-2 py-1">
                 <Globe className="h-3 w-3 mr-2" /> English
               </div>
               <div className="flex items-center border border-zinc-700 rounded px-2 py-1">
                 Kenya & East Africa
               </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-full border border-zinc-700 hover:border-primary hover:text-primary transition-all">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-full border border-zinc-700 hover:border-primary hover:text-primary transition-all">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-full border border-zinc-700 hover:border-primary hover:text-primary transition-all">
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Payment Methods & Legal */}
      <div className="bg-[#0f1111] py-10 border-t border-zinc-900">
        <div className="container mx-auto px-4 text-center space-y-6">
          <div className="flex flex-wrap justify-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all">
            <span className="text-sm font-bold uppercase tracking-widest">Visa</span>
            <span className="text-sm font-bold uppercase tracking-widest">Mastercard</span>
            <span className="text-sm font-bold uppercase tracking-widest">M-Pesa</span>
            <span className="text-sm font-bold uppercase tracking-widest">PayPal</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
            <Link href="#">Conditions of Use</Link>
            <Link href="#">Privacy Notice</Link>
            <Link href="#">Interest-Based Ads</Link>
          </div>
          
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
            &copy; {currentYear}, Benace Store or its affiliates. Your one-stop shop for everything you need.
          </p>
        </div>
      </div>
    </footer>
  );
}
