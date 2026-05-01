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
    <footer className="border-t-4 border-black bg-white">
      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-16 md:grid-cols-3">
          <div className="flex flex-col gap-6">
             <Link href="/" className="w-fit">
                <Image
                    src="/use.png"
                    alt="Benace Technologies Logo"
                    width={160}
                    height={40}
                    className="object-contain"
                />
             </Link>
             <p className="text-sm font-bold leading-relaxed text-zinc-600">
                Benace Tech Hub is Nairobi's premier partner in innovation. We provide high-quality laptops, professional repairs, and custom digital craftsmanship.
             </p>
             <div className="flex gap-4">
               <div className="h-10 w-10 border-2 border-black bg-primary"></div>
               <div className="h-10 w-10 border-2 border-black bg-black"></div>
               <div className="h-10 w-10 border-2 border-black bg-zinc-200"></div>
             </div>
          </div>
           <div className="flex flex-col gap-6">
            <h3 className="text-xl font-black uppercase tracking-widest text-black">Visit Us</h3>
            <div className="space-y-4 text-sm font-black text-zinc-800">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-primary tracking-widest mb-1">Location</span>
                  <span>Old Nation House, 2nd Flr, Shop D1</span>
                  <span>Nairobi, Kenya</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-primary tracking-widest mb-1">Contact</span>
                  <span>0714210957</span>
                  <span>benacetechnologies@gmail.com</span>
                </div>
            </div>
           </div>
           <div className="flex flex-col gap-6">
             <h3 className="text-xl font-black uppercase tracking-widest text-black">Navigation</h3>
             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {navLinks.map((link) => (
                    <Link 
                        key={link.href}
                        href={link.href} 
                        className="text-sm font-bold text-zinc-500 transition-all hover:text-primary hover:translate-x-1"
                    >
                        {link.name}
                    </Link>
                ))}
             </div>
           </div>
        </div>
        <div className="mt-16 border-t-2 border-zinc-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                &copy; {new Date().getFullYear()} Benace Tech Hub. Engineered for Excellence.
             </p>
             <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
               Old Nation, Nairobi • Kenya
             </div>
        </div>
      </div>
    </footer>
  );
}
