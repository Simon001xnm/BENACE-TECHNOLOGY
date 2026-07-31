import { LaptopsGrid } from '@/components/laptops/laptops-grid';

export default function LaptopsPage() {
  return (
    <div className="bg-[#f4f4f4] min-h-screen w-full">
      <div className="w-full">
        <div className="container mx-auto px-4 py-8 mb-6">
          <h1 className="text-3xl font-black tracking-tighter text-zinc-900 uppercase">
            Laptops & Notebooks
          </h1>
          <p className="text-sm font-bold text-muted-foreground mt-2 uppercase tracking-widest">
            Find the perfect portable computer for work, play, or school in Nairobi.
          </p>
        </div>
        <LaptopsGrid />
      </div>
    </div>
  );
}
