import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary uppercase">
            About Benace Tech Hub
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Benace Tech Hub is a premier computer shop and technical solutions hub based in Nairobi. We specialize in high-quality hardware, expert repairs, and custom digital services.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Our mission is to empower professionals, students, and businesses across East Africa with reliable technology and world-class support.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-lg border bg-card p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-primary">100%</p>
              <p className="text-xs text-muted-foreground font-black uppercase tracking-widest mt-2">Quality Support</p>
            </div>
            <div className="rounded-lg border bg-card p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-primary">Fast</p>
              <p className="text-xs text-muted-foreground font-black uppercase tracking-widest mt-2">Turnaround</p>
            </div>
          </div>
        </div>
        <div className="relative h-[450px] overflow-hidden rounded-3xl shadow-2xl border-4 border-white">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt="Benace Tech Hub Workspace"
              fill
              className="object-cover"
              data-ai-hint="modern office"
            />
          )}
        </div>
      </div>
    </div>
  );
}
