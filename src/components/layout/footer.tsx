import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  const navLinks = [
    { name: 'Laptops', href: '/laptops' },
    { name: 'Desktops & Monitors', href: '/desktops' },
    { name: 'Repairs', href: '/repairs' },
    { name: 'Laptop Hire', href: '/laptop-hire' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="border-t border-black bg-white">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="flex flex-col gap-4">
             <Link href="/">
                <Image
                    src="/use.png"
                    alt="Benace Technologies Logo"
                    width={140}
                    height={35}
                    className="object-contain"
                />
             </Link>
             <p className="text-sm font-medium text-black/70">
                Your partner in innovation. Providing high-quality tech solutions to power your digital life.
             </p>
          </div>
           <div className="flex flex-col gap-4">
            <h3 className="text-lg font-black uppercase tracking-widest text-black border-b-2 border-primary w-fit pb-1">Contact Us</h3>
            <div className="space-y-2 text-sm font-bold text-black/80">
                <p>Location: Old Nation, 2nd Flr, Shop D1</p>
                <p>Email: benacetechnologies@gmail.com</p>
                <p>Contact: 0714210957</p>
                <p>P.O. Box 709, Naivasha</p>
            </div>
           </div>
           <div className="flex flex-col gap-4">
             <h3 className="text-lg font-black uppercase tracking-widest text-black border-b-2 border-primary w-fit pb-1">Quick Links</h3>
             <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                    <Link 
                        key={link.href}
                        href={link.href} 
                        className="text-sm font-bold text-black/60 transition-colors hover:text-primary"
                    >
                        {link.name}
                    </Link>
                ))}
             </div>
           </div>
        </div>
        <div className="mt-12 border-t border-black/10 pt-8 text-center">
             <p className="text-xs font-bold text-black/40 uppercase tracking-widest">
                &copy; {new Date().getFullYear()} Benace Tech Hub. All rights reserved.
             </p>
        </div>
      </div>
    </footer>
  );
}
