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
    subtitle: 'QUALITY GEAR • FAIR PRICES',
    description: 'Find fast and reliable computers for school, work, or business. We have the best models ready for you today.',
    cta: 'Browse Laptops',
    link: '/laptops',
    showcaseImages: ['laptop-hp-830-g8-1', 'laptop-dell-pro-14-1', 'laptop-lenovo-thinkbook-14-irl-1'],
    bgImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1920&auto=format&fit=crop',
    hint: 'modern laptop'
  },
  {
    title: 'FAST COMPUTER REPAIR SERVICE.',
    subtitle: 'CBD NAIROBI • SAME DAY',
    description: 'Is your laptop broken or slow? We fix screens, batteries, and software problems quickly so you can get back to work.',
    cta: 'Fix My Device',
    link: '/repairs',
    showcaseImages: ['accessory-dell-mouse-1', 'laptop-hp-830-g7-1'],
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
                className="object-cover opacity-40 grayscale-[0.5]"
                priority={index === 0}
                data-ai-hint={slide.hint}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            </div>

            <div className="container relative z-10 flex h-full items-center px-6">
              <div className="grid w-full gap-12 lg:grid-cols-2 lg:items-center">
                {/* Left Side: Impactful Text */}
                <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-left duration-700">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <Sparkles className="h-3.5 w-3.5 text-primary" /> {slide.subtitle}
                  </div>
                  <h1 className="font-headline text-3xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl uppercase italic">
                    {slide.title}
                  </h1>
                  <p className="max-w-md text-base font-bold text-zinc-400 italic leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row pt-4">
                    <Button asChild size="lg" className="h-14 rounded-xl bg-primary px-10 text-[11px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
                      <Link href={slide.link} className="flex items-center gap-2">
                        {slide.cta} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="h-14 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm px-10 text-[11px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
                      <Link href="https://wa.me/254714210957" target="_blank" className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Right Side: Showcase Showcase (Replacing Pop-ups) */}
                <div className="relative hidden lg:flex items-center justify-center h-[500px] animate-in fade-in zoom-in duration-1000 delay-300">
                  <div className="relative h-full w-full rounded-[3rem] overflow-hidden border-8 border-white/5 bg-black/20 backdrop-blur-xl p-8">
                     <div className="grid grid-cols-2 gap-4 h-full">
                        {slide.showcaseImages.slice(0, 4).map((imgId, idx) => {
                          const img = PlaceHolderImages.find(p => p.id === imgId);
                          if (!img) return null;
                          return (
                            <div key={idx} className={cn(
                              "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5",
                              idx === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                            )}>
                              <Image 
                                src={img.imageUrl} 
                                alt={img.description} 
                                fill 
                                className="object-cover p-2 hover:scale-110 transition-transform duration-500" 
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

      {/* Progress Dots */}
      <div className="absolute bottom-10 left-6 z-20 flex gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-1 transition-all duration-500 rounded-full",
              current === i ? "w-12 bg-primary" : "w-4 bg-white/20"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </Carousel>
  );
}
