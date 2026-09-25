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
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const SLIDES = [
  {
    title: 'THE BEST LAPTOPS IN NAIROBI.',
    subtitle: 'QUALITY • FAIR PRICES',
    description: 'Find fast and reliable computers for school, work, or business. We have high-spec 13th Gen models ready for you today.',
    cta: 'Browse Laptops',
    link: '/laptops',
    showcaseImages: ['lenovo-thinkbook-14-g6-webp', 'laptop-dell-pro-14-1', 'hero-1'],
    bgImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1920&auto=format&fit=crop',
    hint: 'modern laptop'
  },
  {
    title: 'FAST COMPUTER REPAIR SERVICE.',
    subtitle: 'CBD NAIROBI • SAME DAY',
    description: 'Is your laptop broken or slow? We fix screens, batteries, and software problems quickly so you can get back to work.',
    cta: 'Fix My Device',
    link: '/repairs',
    showcaseImages: ['accessory-dell-mouse-1', 'cart-item-placeholder'],
    bgImage: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=1920&auto=format&fit=crop',
    hint: 'repair tools'
  },
  {
    title: 'PROFESSIONAL WEB DESIGN.',
    subtitle: 'GROW YOUR BUSINESS ONLINE',
    description: 'We build beautiful, fast websites and setup POS systems to help your business find more customers in Kenya.',
    cta: 'View Our Work',
    link: '/services',
    showcaseImages: ['portfolio-1', 'portfolio-2'],
    bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920&auto=format&fit=crop',
    hint: 'business website'
  }
];

export function HeroSlider() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 6000);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => clearInterval(interval);
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
      <CarouselContent>
        {SLIDES.map((slide, index) => (
          <CarouselItem key={index} className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
            {/* Dark Professional Background */}
            <div className="absolute inset-0 z-0">
              <Image
                src={slide.bgImage}
                alt={slide.title}
                fill
                className="object-cover opacity-30 grayscale-[0.2]"
                priority={index === 0}
                data-ai-hint={slide.hint}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
            </div>

            <div className="container relative z-10 flex h-full items-center px-6">
              <div className="grid w-full gap-12 lg:grid-cols-2 lg:items-center">
                {/* Left Side: Impactful Text */}
                <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-left duration-700">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#0070ba]/20 border border-[#0070ba]/40 backdrop-blur-md px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <Sparkles className="h-4 w-4 text-[#0070ba]" /> {slide.subtitle}
                  </div>
                  <h1 className="font-headline text-4xl font-black leading-[1.1] tracking-tighter text-white md:text-6xl lg:text-7xl uppercase">
                    {slide.title}
                  </h1>
                  <p className="max-w-md text-lg font-bold text-zinc-400 leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row pt-6">
                    <Button asChild size="lg" className="h-16 rounded-none bg-[#0070ba] px-12 text-[12px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-[#0070ba] transition-all shadow-2xl">
                      <Link href={slide.link} className="flex items-center gap-3">
                        {slide.cta} <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="h-16 rounded-none border-2 border-white/20 bg-white/5 backdrop-blur-md px-12 text-[12px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
                      <Link href="https://wa.me/254714210957" target="_blank" className="flex items-center gap-3">
                        <MessageCircle className="h-5 w-5" /> WhatsApp Support
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Right Side: Product Showcase */}
                <div className="relative hidden lg:flex items-center justify-center h-[550px] animate-in fade-in zoom-in duration-1000 delay-300">
                  <div className="relative h-full w-full rounded-[4rem] overflow-hidden border-8 border-white/5 bg-black/40 backdrop-blur-2xl p-10 shadow-2xl">
                     <div className="grid grid-cols-2 gap-6 h-full">
                        {slide.showcaseImages.slice(0, 4).map((imgId, idx) => {
                          const img = PlaceHolderImages.find(p => p.id === imgId);
                          if (!img) return null;
                          return (
                            <div key={idx} className={cn(
                              "relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-inner",
                              idx === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                            )}>
                              <Image 
                                src={img.imageUrl} 
                                alt={img.description} 
                                fill 
                                className="object-cover p-4 transition-transform duration-700 hover:scale-110" 
                                data-ai-hint={img.imageHint}
                              />
                            </div>
                          );
                        })}
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Progress Bar Indicators */}
      <div className="absolute bottom-12 left-8 z-20 flex gap-4">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-1.5 transition-all duration-500 rounded-full",
              current === i ? "w-16 bg-[#0070ba]" : "w-6 bg-white/30"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </Carousel>
  );
}
