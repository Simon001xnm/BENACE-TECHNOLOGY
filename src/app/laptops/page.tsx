import { LaptopsGrid } from '@/components/laptops/laptops-grid';

export default function LaptopsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary">
          Our Laptop Collection
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Browse our curated selection of high-performance laptops. Use the filters to find the perfect device for your needs.
        </p>
      </div>
      <LaptopsGrid />
    </div>
  );
}
