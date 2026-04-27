'use client';

import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { MessageCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto flex h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">You can't checkout with an empty cart.</p>
        <Button asChild className="mt-4">
          <Link href="/laptops">Continue Shopping</Link>
        </Button>
      </div>
    );
  }
  
  const handleWhatsAppCheckout = () => {
    const phoneNumber = '254714210957';
    let message = "Hello Benace Tech Hub, I'd like to place an order for the following items:\n\n";
    
    cartItems.forEach(item => {
      message += `${item.name} (x${item.quantity}) - KSH ${(item.price * item.quantity).toFixed(2)}\n`;
    });

    const total = cartTotal * 1.08;
    message += `\nSubtotal: KSH ${cartTotal.toFixed(2)}`;
    message += `\nTaxes (8%): KSH ${(cartTotal * 0.08).toFixed(2)}`;
    message += `\n*Total: KSH ${total.toFixed(2)}*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');

    toast({
        title: "Redirecting to WhatsApp",
        description: "Your order details have been prepared. Please complete your purchase on WhatsApp."
    });

    clearCart();
    router.push('/');
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:px-6 md:py-12">
      <h1 className="mb-8 font-headline text-4xl font-bold tracking-tight text-primary text-center">
        Complete Your Order
      </h1>
      <p className="text-center text-muted-foreground mb-8">
        Review your items below and complete your purchase via WhatsApp.
      </p>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map(item => {
                const itemImage = PlaceHolderImages.find(img => img.id === item.imageId);
                return (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 rounded-md">
                        {itemImage && (
                             <Image
                                src={itemImage.imageUrl}
                                alt={item.name}
                                fill
                                className="rounded-md object-cover"
                                sizes="48px"
                                data-ai-hint={itemImage.imageHint}
                              />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">KSH {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                );
              })}
            </CardContent>
            <CardFooter className="flex flex-col items-stretch space-y-2">
                <div className="flex justify-between font-semibold">
                    <span>Subtotal</span>
                    <span>KSH {cartTotal.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Taxes</span>
                    <span>KSH {(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                 <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Shipping</span>
                    <span>FREE</span>
                </div>
                 <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                    <span>Total</span>
                    <span>KSH {(cartTotal * 1.08).toFixed(2)}</span>
                </div>
            </CardFooter>
          </Card>
           <Button size="lg" className="mt-8 w-full" onClick={handleWhatsAppCheckout}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Checkout on WhatsApp
            </Button>
        </div>
    </div>
  );
}
