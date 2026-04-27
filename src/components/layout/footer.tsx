import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2">
             <h3 className="font-semibold text-primary">Benace Tech Hub</h3>
             <p className="text-sm text-muted-foreground">
                Your partner in innovation.
             </p>
          </div>
           <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-primary">Contact Us</h3>
            <div className="text-sm text-muted-foreground">
                <p>Location: Old Nation, 2nd Flr, Shop D1</p>
                <p>Email: benacetechnologies@gmail.com</p>
                <p>Contact: 0714210957</p>
                <p>P.O. Box 709, Naivasha</p>
            </div>
           </div>
           <div className="flex flex-col gap-2">
             <h3 className="font-semibold text-primary">Quick Links</h3>
             <Link href="/laptops" className="text-sm text-muted-foreground hover:text-primary">
              Laptops
            </Link>
            <Link href="/services" className="text-sm text-muted-foreground hover:text-primary">
              Services
            </Link>
           </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center">
             <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Benace Tech Hub. All rights reserved.
             </p>
        </div>
      </div>
    </footer>
  );
}
