import { LaptopsGrid } from '@/components/laptops/laptops-grid';

export default function LaptopsPage() {
  return (
    <div className="bg-[#f4f4f4] min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            Laptops & Notebooks
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Find the perfect portable computer for work, play, or creative projects.
          </p>
        </div>
        <LaptopsGrid />
      </div>
    </div>
  );
}