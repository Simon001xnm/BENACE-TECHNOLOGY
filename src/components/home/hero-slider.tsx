'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Sparkles, ArrowRight, Laptop, MessageCircle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const SLIDES = [
  {
    title: 'THE BEST LAPTOPS IN TOWN.',
    subtitle: 'CHEAP PRICES • GOOD QUALITY',
    description: 'Come to Benace Tech Hub for the best computers. We have very fast laptops that work well for school and work.',
    cta: 'Buy a Laptop',
    link: '/laptops',
    floatingProducts: ['laptop-hp-830-g8-1', 'laptop-dell-pro-14-1'],
    videoUrl: 'https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4',
  },
  {
    title: 'WE FIX BROKEN LAPTOPS.',
    subtitle: 'FAST REPAIR • NAIROBI CBD',
    description: 'Is your screen broken? Is your laptop slow? Our experts fix all problems quickly so you can get back to work.',
    cta: 'Fix My Laptop',
    link: '/repairs',
    floatingProducts: ['accessory-dell-mouse-1'],
    imageUrl: 'https://picsum.photos/seed/repair/1920/1080',
    hint: 'repair shop'
  },
  {
    title: 'RENT A LAPTOP FOR LESS.',
    subtitle: 'SAVE MONEY • RENT TODAY',
    description: 'Do not spend all your money buying a laptop. Rent one from us for a few days or weeks. It is very easy!',
    cta: 'Rent a Laptop',
    link: '/laptop-hire',
    floatingProducts: ['laptop-lenovo-thinkbook-14-irl-1'],
    imageUrl: 'https://picsum.photos/seed/office/1920/1080',
    hint: 'modern office'
  }
];

export function HeroSlider() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 8000);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => clearInterval(interval);
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
      <CarouselContent>
        {SLIDES.map((slide, index) => (
          <CarouselItem key={index} className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0 bg-black">
              {slide.videoUrl ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover opacity-40"
                >
                  <source src={slide.videoUrl} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={slide.imageUrl!}
                  alt={slide.title}
                  fill
                  className="object-cover opacity-40"
                  priority={index === 0}
                  data-ai-hint={slide.hint}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            </div>

            <div className="container relative z-10 flex h-full items-center px-4 md:px-6">
              <div className="grid w-full gap-12 lg:grid-cols-2 lg:items-center">
                {/* Text Content */}
                <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                  <div className="inline-flex items-center gap-2 rounded-none bg-primary px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-white">
                    <Sparkles className="h-4 w-4" /> {slide.subtitle}
                  </div>
                  <h1 className="font-headline text-5xl font-black leading-tight tracking-tighter text-white md:text-8xl italic uppercase">
                    {slide.title.split('.').map((part, i) => (
                      <span key={i} className="block">{part}</span>
                    ))}
                  </h1>
                  <p className="max-w-lg text-lg font-medium text-zinc-300 md:text-xl">
                    {slide.description}
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row pt-4">
                    <Button asChild size="lg" className="h-16 rounded-none bg-primary px-10 text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-all border-2 border-primary">
                      <Link href={slide.link}>{slide.cta}</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="h-16 rounded-none border-2 border-white bg-transparent px-10 text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black">
                      <Link href="https://wa.me/254714210957" target="_blank" className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" /> Talk to Us
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Floating Products Display */}
                <div className="relative hidden lg:block h-[500px]">
                  {slide.floatingProducts.map((prodId, pIdx) => {
                    const imgData = PlaceHolderImages.find(img => img.id === prodId);
                    if (!imgData) return null;
                    return (
                      <div 
                        key={prodId}
                        className={cn(
                          "absolute transition-all duration-1000",
                          pIdx === 0 ? "top-10 right-0 animate-float" : "bottom-10 left-20 animate-float-delayed"
                        )}
                      >
                        <div className="relative h-72 w-72 overflow-hidden bg-white/10 backdrop-blur-sm border-4 border-white/20 p-8 shadow-2xl">
                          <Image 
                            src={imgData.imageUrl} 
                            alt="Floating Product" 
                            fill 
                            className="object-contain p-6"
                            sizes="300px"
                          />
                          <div className="absolute bottom-4 left-4 right-4 bg-primary p-2 text-center text-[8px] font-black uppercase tracking-widest text-white">
                            BEST OFFER TODAY
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-10 left-10 h-20 w-20 rounded-full border-4 border-primary/20 animate-pulse" />
                  <div className="absolute top-40 right-40 h-10 w-10 bg-primary/30 animate-bounce" />
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="absolute bottom-8 left-10 z-20 flex gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-1 transition-all duration-500 rounded-none",
              current === i ? "w-16 bg-primary" : "w-4 bg-white/30"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </Carousel>
  );
}
