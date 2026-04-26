import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LaptopCard } from '@/components/laptops/laptop-card';
import { laptops, accessories } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AccessoryCard } from '@/components/accessories/accessory-card';

export default function Home() {
  const featuredLaptops = laptops.slice(0, 4);
  const featuredAccessories = accessories.slice(0, 4);
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-1');

  return (
    <div className="flex flex-col">
      <section className="relative w-full bg-primary/10 py-20 md:py-32 lg:py-40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl lg:text-6xl">
                Your Vision, Our Code.
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Discover powerful laptops and bespoke web design solutions.
                Benace Tech Hub is your partner in innovation.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/laptops">Shop Laptops</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-64 w-full md:h-96">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  className="rounded-lg object-cover shadow-2xl"
                  data-ai-hint={heroImage.imageHint}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="laptops" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Featured Laptops
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Top-tier performance, sleek designs. Find the perfect machine for
              work and play.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredLaptops.map(laptop => (
              <LaptopCard key={laptop.id} laptop={laptop} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/laptops">
                View All Laptops <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="accessories" className="bg-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Featured Accessories
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Enhance your setup with our curated selection of accessories.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredAccessories.map(accessory => (
              <AccessoryCard key={accessory.id} accessory={accessory} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/accessories">
                View All Accessories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
