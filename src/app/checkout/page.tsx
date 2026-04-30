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
import { MessageCircle, ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto flex h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">You haven't added any products to your cart yet.</p>
        <Button asChild className="mt-4">
          <Link href="/laptops">Start Shopping</Link>
        </Button>
      </div>
    );
  }
  
  const handleWhatsAppCheckout = () => {
    const phoneNumber = '254714210957';
    let message = "*NEW ORDER FROM BENACE TECH HUB WEBSITE*\n\n";
    message += "I would like to purchase the following items:\n";
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: KSH ${item.price.toLocaleString()}\n\n`;
    });

    message += `*ORDER SUMMARY:*\n`;
    message += `Subtotal: KSH ${cartTotal.toLocaleString()}\n`;
    message += `*Total Due: KSH ${cartTotal.toLocaleString()}*\n\n`;
    message += `*Customer Details (Please fill):*\n`;
    message += `Name: \n`;
    message += `Location: \n`;
    message += `Preferred Delivery Time: `;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');

    toast({
        title: "Redirecting to WhatsApp",
        description: "Your order summary has been prepared. Please send the message on WhatsApp to complete your purchase."
    });

    clearCart();
    router.push('/');
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 md:py-20">
      <div className="mb-10">
        <Button asChild variant="ghost" className="pl-0 text-muted-foreground hover:text-primary transition-all">
            <Link href="/laptops">
                <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
            </Link>
        </Button>
      </div>

      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary">
          Checkout
        </h1>
        <p className="mt-3 text-muted-foreground">
          Confirm your items and proceed to WhatsApp to finalize your order.
        </p>
      </div>

      <Card className="overflow-hidden border-none shadow-2xl bg-card/50 backdrop-blur-sm">
        <CardHeader className="bg-primary text-primary-foreground p-6">
          <CardTitle className="flex items-center justify-between">
            <span>Order Summary</span>
            <span className="text-sm font-normal opacity-90">{cartItems.length} items</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {cartItems.map(item => {
              const itemImage = PlaceHolderImages.find(img => img.id === item.imageId);
              return (
                <div key={item.id} className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted border shadow-sm">
                      {itemImage && (
                           <Image
                              src={itemImage.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                              data-ai-hint={itemImage.imageHint}
                            />
                      )}
                    </div>
                    <div>
                      <p className="font-bold leading-tight">{item.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.quantity} × KSH {item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-primary">
                    KSH {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-6 p-6 bg-muted/20">
            <div className="space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">KSH {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600 font-bold uppercase text-xs">Free Delivery</span>
                </div>
                 <div className="flex justify-between items-center text-2xl font-black pt-4 border-t border-dashed">
                    <span>TOTAL</span>
                    <span className="text-primary">KSH {cartTotal.toLocaleString()}</span>
                </div>
            </div>
            
            <Button 
              size="lg" 
              className="w-full h-14 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200 hover:scale-[1.01] transition-all" 
              onClick={handleWhatsAppCheckout}
            >
                <MessageCircle className="mr-3 h-6 w-6" />
                Place Order via WhatsApp
            </Button>
            
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <div className="h-px flex-1 bg-border"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2">Secure Direct Order</span>
                <div className="h-px flex-1 bg-border"></div>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
