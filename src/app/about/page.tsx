import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary">
            About Benace Tech Hub
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Benace Tech Hub is a premier technology solution provider based in Naivasha. We specialize in high-quality laptops, desktops, professional repair services, and bespoke web development.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Our mission is to empower individuals and businesses with the right technology tools and services to thrive in a digital world. Whether you're a student looking for an affordable Ex-UK laptop or a business needing a complete digital makeover, we are here to serve you.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-lg border bg-card p-4 text-center">
              <p className="text-3xl font-bold text-primary">100%</p>
              <p className="text-sm text-muted-foreground font-medium">Customer Satisfaction</p>
            </div>
            <div className="rounded-lg border bg-card p-4 text-center">
              <p className="text-3xl font-bold text-primary">Fast</p>
              <p className="text-sm text-muted-foreground font-medium">Repair Turnaround</p>
            </div>
          </div>
        </div>
        <div className="relative h-[400px] overflow-hidden rounded-2xl shadow-xl">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt="Our Workspace"
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