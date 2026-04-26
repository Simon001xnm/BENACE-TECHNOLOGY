import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Benace Tech Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/laptops" className="text-sm text-muted-foreground hover:text-primary">
              Laptops
            </Link>
            <Link href="/services" className="text-sm text-muted-foreground hover:text-primary">
              Services
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
