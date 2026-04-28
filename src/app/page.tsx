import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LaptopCard } from '@/components/laptops/laptop-card';
import { laptops, accessories } from '@/lib/data';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AccessoryCard } from '@/components/accessories/accessory-card';

export default function Home() {
  const featuredLaptops = laptops.slice(0, 4);
  const featuredAccessories = accessories.slice(0, 4);
  const featuredHeroLaptop = laptops.find(
    l => l.id === 'lpt-lenovo-thinkbook-14-irl-1'
  );
  const heroImage = featuredHeroLaptop
    ? PlaceHolderImages.find(img => img.id === featuredHeroLaptop.imageId)
    : PlaceHolderImages.find(img => img.id === 'hero-1');

  return (
    <div className="flex flex-col">
      <section className="relative w-full bg-primary/10 py-20 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-16">
            <div className="relative h-80 w-full md:h-[400px]">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={featuredHeroLaptop?.name || 'Featured Laptop'}
                  fill
                  className="rounded-lg object-contain shadow-2xl"
                  data-ai-hint={heroImage.imageHint}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              )}
            </div>
            <div className="space-y-6">
              <h1 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl lg:text-5xl">
                Lenovo ThinkBook 14-IRL: Power Meets Professionalism
              </h1>
              <p className="text-lg text-muted-foreground">
                A sophisticated 14-inch business laptop delivering the speed and
                security required to excel in a fast-paced digital environment.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Next-Gen Processing: Intel Core 7-240H</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Modern Memory &amp; Storage: 8GB DDR5 &amp; 512GB SSD</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Visual Clarity: 14” WUXGA anti-glare display</span>
                </li>
              </ul>
              <div className="flex items-baseline gap-4">
                <p className="text-4xl font-bold text-primary">
                  KES {featuredHeroLaptop?.price.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/checkout">Buy Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/laptops">Explore All Laptops</Link>
                </Button>
              </div>
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
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
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
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
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
