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
import { Sparkles, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const SLIDES = [
  {
    title: 'THE BEST LAPTOPS IN TOWN.',
    subtitle: 'CHEAP PRICES • GOOD QUALITY',
    description: 'Come to Benace Tech Hub for the best computers. We have fast laptops that work well for school and work.',
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
          <CarouselItem key={index} className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0 bg-black">
              {slide.videoUrl ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover opacity-60"
                >
                  <source src={slide.videoUrl} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={slide.imageUrl!}
                  alt={slide.title}
                  fill
                  className="object-cover opacity-60"
                  priority={index === 0}
                  data-ai-hint={slide.hint}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 lg:bg-gradient-to-r lg:from-black/90 lg:via-black/50 lg:to-transparent" />
            </div>

            <div className="container relative z-10 flex h-full items-center px-4 md:px-6">
              <div className="grid w-full gap-8 lg:grid-cols-2 lg:items-center">
                {/* Text Content */}
                <div className="max-w-xl space-y-4 lg:space-y-6 animate-in fade-in slide-in-from-bottom duration-1000">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-white w-fit">
                    <Sparkles className="h-3.5 w-3.5 text-primary" /> {slide.subtitle}
                  </div>
                  <h1 className="font-headline text-4xl font-black leading-tight tracking-tighter text-white md:text-5xl lg:text-6xl uppercase italic">
                    {slide.title}
                  </h1>
                  <p className="max-w-lg text-sm font-medium text-zinc-300 md:text-base lg:text-lg leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row pt-4">
                    <Button asChild size="lg" className="h-12 rounded-xl bg-primary px-8 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all shadow-xl shadow-primary/20">
                      <Link href={slide.link}>{slide.cta}</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="h-12 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm px-8 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
                      <Link href="https://wa.me/254714210957" target="_blank" className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" /> Talk to Us
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Floating Products Display */}
                <div className="relative hidden lg:block h-[400px]">
                  {slide.floatingProducts.map((prodId, pIdx) => {
                    const imgData = PlaceHolderImages.find(img => img.id === prodId);
                    if (!imgData) return null;
                    return (
                      <div 
                        key={prodId}
                        className={cn(
                          "absolute transition-all duration-1000",
                          pIdx === 0 ? "top-0 right-0 animate-float" : "bottom-0 left-20 animate-float-delayed"
                        )}
                      >
                        <div className="relative h-56 w-56 overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-2xl rounded-3xl">
                          <Image 
                            src={imgData.imageUrl} 
                            alt="Floating Product" 
                            fill 
                            className="object-contain p-4"
                            sizes="224px"
                          />
                          <div className="absolute bottom-4 left-4 right-4 bg-primary/90 backdrop-blur-sm py-1.5 rounded-lg text-center text-[7px] font-black uppercase tracking-widest text-white">
                            BEST OFFER
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:left-10 lg:translate-x-0 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-1.5 transition-all duration-500 rounded-full",
              current === i ? "w-10 bg-primary" : "w-2 bg-white/30"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </Carousel>
  );
}
