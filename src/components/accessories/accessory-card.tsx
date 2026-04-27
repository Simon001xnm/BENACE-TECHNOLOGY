'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import type { Accessory } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export function AccessoryCard({ accessory }: { accessory: Accessory }) {
  const { addToCart } = useCart();
  const accessoryImage = PlaceHolderImages.find(img => img.id === accessory.imageId);
  
  const getStatusClass = () => {
    if (accessory.status === 'New') {
      return 'bg-green-500';
    }
    if (accessory.status === 'Ex-UK') {
      return 'bg-blue-500';
    }
    return 'bg-gray-500';
  };


  return (
    <Card className="flex h-full transform flex-col overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-xl">
      <CardHeader className="relative p-0">
        <div className="relative h-48 w-full bg-gray-100">
          {accessoryImage ? (
            <Image
              src={accessoryImage.imageUrl}
              alt={accessory.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              data-ai-hint={accessoryImage.imageHint}
            />
          ) : (
             <div className="flex h-full w-full items-center justify-center bg-muted">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
             </div>
          )}
        </div>
        <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
          {accessory.status && (
            <Badge
              className={`${getStatusClass()} text-white shadow-md`}
            >
              {accessory.status}
            </Badge>
          )}
        </div>
         {accessory.salePercentage && (
            <div className="absolute top-2 left-2">
                <Badge
                    variant="destructive"
                    className="flex h-6 w-12 items-center justify-center rounded-md p-0 text-xs"
                >
                    -{accessory.salePercentage}%
                </Badge>
            </div>
        )}
      </CardHeader>
      <CardContent className="flex flex-grow flex-col p-4">
        <CardTitle className="mb-1 text-sm font-semibold leading-tight">{accessory.name}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mb-2">
          {accessory.brand} / {accessory.category}
        </CardDescription>
        
        <div className="flex items-center gap-0.5 text-muted-foreground mb-2">
            <div className="w-3 h-3 border rounded-sm"></div>
            <div className="w-3 h-3 border rounded-sm"></div>
            <div className="w-3 h-3 border rounded-sm"></div>
            <div className="w-3 h-3 border rounded-sm"></div>
            <div className="w-3 h-3 border rounded-sm"></div>
        </div>

        <div className="flex flex-col mt-auto">
            <p className="text-lg font-bold text-primary">KES {accessory.price.toLocaleString()}</p>
            {accessory.oldPrice && (
              <p className="text-xs text-muted-foreground line-through">
                KES {accessory.oldPrice.toLocaleString()}
              </p>
            )}
          </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 p-2 pt-0">
        <Button variant="outline" onClick={() => addToCart(accessory)} size="sm" className="text-xs">
          <ShoppingCart className="mr-2 h-3 w-3" /> Add to Cart
        </Button>
        <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs">
            <Link href="/checkout">Checkout</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
