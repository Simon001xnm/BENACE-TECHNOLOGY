'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import type { Accessory } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShoppingCart } from 'lucide-react';

export function AccessoryCard({ accessory }: { accessory: Accessory }) {
  const { addToCart } = useCart();
  const accessoryImage = PlaceHolderImages.find(img => img.id === accessory.imageId);

  return (
    <Card className="flex h-full transform flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          {accessoryImage && (
            <Image
              src={accessoryImage.imageUrl}
              alt={accessory.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              data-ai-hint={accessoryImage.imageHint}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="mb-2 text-lg">{accessory.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{accessory.brand}</p>
        <div className="mt-2 text-sm text-muted-foreground">
            <p>{accessory.category}</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4">
        <p className="text-lg font-bold text-primary">${accessory.price.toFixed(2)}</p>
        <Button variant="outline" onClick={() => addToCart(accessory)}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
