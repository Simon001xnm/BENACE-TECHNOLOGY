'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { laptops } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LaptopCard } from '@/components/laptops/laptop-card';
import { ShoppingCart, ArrowLeft, Cpu, HardDrive, Monitor, Layers, Info } from 'lucide-react';
import { useMemo } from 'react';

export default function LaptopDetailPage() {
  const params = useParams();
  const laptopId = params.id as string;
  const { addToCart } = useCart();

  const laptop = useMemo(() => laptops.find((l) => l.id === laptopId), [laptopId]);

  const relatedLaptops = useMemo(() => {
    if (!laptop) return [];
    return laptops
      .filter((l) => l.id !== laptop.id && (l.brand === laptop.brand || Math.abs(l.price - laptop.price) < 20000))
      .slice(0, 4);
  }, [laptop]);

  if (!laptop) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-primary">Laptop not found</h1>
        <Button asChild className="mt-4" variant="outline">
          <Link href="/laptops">Back to Collection</Link>
        </Button>
      </div>
    );
  }

  const laptopImage = PlaceHolderImages.find((img) => img.id === laptop.imageId);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Button asChild variant="ghost" className="mb-8 pl-0 text-muted-foreground hover:text-primary">
        <Link href="/laptops">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Collection
        </Link>
      </Button>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted p-8 shadow-inner">
          {laptopImage ? (
            <Image
              src={laptopImage.imageUrl}
              alt={laptop.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              data-ai-hint={laptopImage.imageHint}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ShoppingCart className="h-24 w-24 text-muted-foreground/20" />
            </div>
          )}
          {laptop.status && (
            <Badge className="absolute left-6 top-6 scale-125 px-4 py-1 text-sm shadow-md">
              {laptop.status}
            </Badge>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="mb-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {laptop.brand}
            </p>
            <h1 className="font-headline text-3xl font-bold text-primary md:text-4xl">
              {laptop.name}
            </h1>
          </div>

          <div className="mb-8 flex items-baseline gap-4">
            <p className="text-3xl font-bold text-primary">
              KES {laptop.price.toLocaleString()}
            </p>
            {laptop.oldPrice && (
              <p className="text-lg text-muted-foreground line-through">
                KES {laptop.oldPrice.toLocaleString()}
              </p>
            )}
          </div>

          {laptop.description && (
            <div className="mb-8 rounded-lg bg-primary/5 p-4 border-l-4 border-primary">
              <div className="flex items-center gap-2 font-bold mb-2">
                <Info className="h-4 w-4 text-primary" /> Product Overview
              </div>
              <p className="text-muted-foreground leading-relaxed italic">
                {laptop.description}
              </p>
            </div>
          )}

          <div className="mb-10 space-y-6">
            <h2 className="text-lg font-bold">Technical Specifications</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm">
                <Cpu className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Processor</p>
                  <p className="text-sm font-medium">{laptop.specifications.processor}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm">
                <Layers className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Memory</p>
                  <p className="text-sm font-medium">{laptop.specifications.ram}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm">
                <HardDrive className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Storage</p>
                  <p className="text-sm font-medium">{laptop.specifications.storage}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm">
                <Monitor className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Display</p>
                  <p className="text-sm font-medium">{laptop.specifications.display || 'Standard'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="flex-1" onClick={() => addToCart(laptop)}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="secondary" asChild className="flex-1">
              <Link href="/checkout">Buy Now</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedLaptops.length > 0 && (
        <section className="mt-24 border-t pt-16">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-headline text-2xl font-bold text-primary">
              Similar Products
            </h2>
            <Link href="/laptops" className="text-sm font-medium text-primary hover:underline">
              View all laptops
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedLaptops.map((related) => (
              <LaptopCard key={related.id} laptop={related} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
